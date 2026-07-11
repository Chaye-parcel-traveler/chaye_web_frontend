import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const mode = process.argv[2] ?? 'up';
const apiDir = resolve(process.env.E2E_API_DIR ?? '../chaye_API');
const e2eApiPort = process.env.E2E_API_PORT ?? '3333';
const e2eFrontendPort = process.env.E2E_FRONTEND_PORT ?? '3000';
const richSeedFiles = [
  './database/seeders/01_member.ts',
  './database/seeders/02_announcement.ts',
  './database/seeders/05_recipient.ts',
  './database/seeders/04_cooperation.ts',
  './database/seeders/06_tchat.ts',
];

const run = (command, args, options = {}) =>
  spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.stdio ?? 'pipe',
    ...options,
  });

const fail = (message, details = '') => {
  console.error(`\n${message}`);
  if (details) {
    console.error(details.trim());
  }
  process.exit(1);
};

const isCommandAvailable = (command) => {
  const result = run('sh', ['-c', `command -v ${command}`]);
  return !result.error && result.status === 0;
};

const dockerInfo = () => run('docker', ['info']);

const startDockerService = () => {
  if (process.platform !== 'linux' || !isCommandAvailable('systemctl')) {
    return false;
  }

  console.log('Le daemon Docker ne répond pas. Tentative de démarrage...');
  const result = run('sudo', ['systemctl', 'start', 'docker'], {
    stdio: 'inherit',
  });

  return !result.error && result.status === 0;
};

const dockerVersion = run('docker', ['--version']);
if (dockerVersion.error || dockerVersion.status !== 0) {
  fail(
    'Docker est requis pour lancer la stack E2E.',
    'Installe Docker Engine ou Docker Desktop, puis relance la commande.',
  );
}

const composeVersion = run('docker', ['compose', 'version']);
if (composeVersion.error || composeVersion.status !== 0) {
  fail(
    'Docker Compose v2 est requis pour lancer la stack E2E.',
    'Vérifie que la commande `docker compose version` fonctionne.',
  );
}

let dockerStatus = dockerInfo();
if (dockerStatus.error || dockerStatus.status !== 0) {
  const serviceStarted = startDockerService();
  if (serviceStarted) {
    dockerStatus = dockerInfo();
  }
}

if (dockerStatus.error || dockerStatus.status !== 0) {
  fail(
    'Le daemon Docker ne répond pas.',
    [
      'Le lanceur a essayé de démarrer Docker quand c’était possible.',
      'Docker doit être lancé avant de démarrer la stack E2E.',
      '',
      'Linux avec systemd:',
      '  sudo systemctl start docker',
      '',
      'Si Docker est lancé mais que ton utilisateur n’a pas accès au socket:',
      '  sudo usermod -aG docker $USER',
      '  newgrp docker',
      '',
      'Puis vérifie:',
      '  docker info',
      '',
      dockerStatus.stderr,
    ].join('\n'),
  );
}

if (!existsSync(apiDir)) {
  fail(
    `Le dossier API E2E est introuvable: ${apiDir}`,
    'Définis E2E_API_DIR avec le chemin absolu vers le backend API.',
  );
}

if (!existsSync(resolve(apiDir, 'Dockerfile'))) {
  fail(
    `Le dossier API ne contient pas de Dockerfile: ${apiDir}`,
    'E2E_API_DIR doit pointer vers la racine du repo backend compatible Docker.',
  );
}

const composeEnv =
  mode === 'test'
    ? process.env
    : {
        ...process.env,
        VITE_API_ASSETS_URL:
          process.env.VITE_API_ASSETS_URL ?? `http://127.0.0.1:${e2eApiPort}`,
        VITE_API_URL:
          process.env.VITE_API_URL ?? `http://127.0.0.1:${e2eApiPort}`,
      };

const runCompose = (args, options = {}) =>
  run('docker', ['compose', '-f', 'compose.e2e.yml', ...args], {
    env: composeEnv,
    stdio: options.stdio ?? 'inherit',
  });

const seedRichDemoData = () => {
  if (process.env.E2E_SEED_PROFILE === 'minimal') {
    console.log('Seed riche ignoré: E2E_SEED_PROFILE=minimal.');
    return;
  }

  console.log('');
  console.log('Insertion des données de démonstration riches...');

  for (const seedFile of richSeedFiles) {
    const result = runCompose([
      'exec',
      '-T',
      '-e',
      'NODE_ENV=development',
      'api-e2e',
      'node',
      'ace',
      'db:seed',
      '--files',
      seedFile,
    ]);

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
};

if (mode !== 'test') {
  console.log('');
  console.log('Stack E2E pour consultation locale:');
  console.log(`  Frontend: http://127.0.0.1:${e2eFrontendPort}/`);
  console.log(`  API:      http://127.0.0.1:${e2eApiPort}/`);
  console.log('');
}

if (mode === 'test') {
  const result = runCompose(['run', '--rm', 'e2e']);
  process.exit(result.status ?? 1);
}

const upResult = runCompose([
  'up',
  '-d',
  '--build',
  'db-e2e',
  'api-e2e',
  'frontend-e2e',
]);

if (upResult.status !== 0) {
  process.exit(upResult.status ?? 1);
}

seedRichDemoData();

console.log('');
console.log('Stack prête.');
console.log(`  Frontend: http://127.0.0.1:${e2eFrontendPort}/`);
console.log(`  API:      http://127.0.0.1:${e2eApiPort}/`);
console.log('');
console.log('Logs:');
console.log('  docker compose -f compose.e2e.yml logs -f api-e2e frontend-e2e');
