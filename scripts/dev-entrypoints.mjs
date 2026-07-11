const lines = [
  '',
  'Chaye frontend: choisissez un lancement explicite.',
  '',
  'Frontend local seul:',
  '  pnpm run dev:frontend',
  '',
  'Frontend dans Docker:',
  '  pnpm run dev:docker',
  '',
  'Stack complète E2E Docker Compose: MariaDB + API + frontend:',
  '  E2E_API_DIR=/chemin/vers/chaye_API ./launch',
  '  E2E_API_DIR=/chemin/vers/chaye_API pnpm run dev:e2e-stack',
  '  E2E_SEED_PROFILE=minimal E2E_API_DIR=/chemin/vers/chaye_API ./launch',
  '',
  'Tests E2E complets:',
  '  E2E_API_DIR=/chemin/vers/chaye_API pnpm run e2e:stack',
  '',
  'Le script dev ne lance plus le projet pour éviter de confondre frontend seul et stack complète.',
  '',
];

console.log(lines.join('\n'));
