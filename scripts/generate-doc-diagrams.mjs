import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const diagramsDir = resolve(rootDir, 'docs/diagrams');

const writeDiagram = (filename, content) => {
  mkdirSync(diagramsDir, { recursive: true });
  writeFileSync(resolve(diagramsDir, filename), `${content.trim()}\n`);
};

writeDiagram(
  'applicationStructure.svg',
  `
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">
  <title id="title">Structure applicative Chaye frontend</title>
  <desc id="desc">Diagramme des couches src app, features, shared, lib, config et test.</desc>
  <style>
    text { font-family: Arial, sans-serif; fill: #252331; }
    .box { fill: #ffffff; stroke: #56469f; stroke-width: 2; rx: 10; }
    .app { fill: #f15f4f; stroke: #f15f4f; }
    .feature { fill: #f5f2ff; }
    .shared { fill: #eef7f1; stroke: #2f9c56; }
    .test { fill: #f8f8fb; stroke: #88829e; }
    .label { font-size: 18px; font-weight: 700; }
    .small { font-size: 14px; fill: #5d596b; }
    .white { fill: #fff; }
    .arrow { stroke: #56469f; stroke-width: 2; fill: none; marker-end: url(#arrow); }
  </style>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#56469f" />
    </marker>
  </defs>
  <rect x="40" y="35" width="880" height="470" fill="#f2f1f8" rx="18" />
  <rect class="box app" x="365" y="65" width="230" height="72" rx="10" />
  <text class="label white" x="405" y="97">src/app</text>
  <text class="small white" x="405" y="119">routes, layout, boundary</text>

  <rect class="box feature" x="70" y="190" width="180" height="100" />
  <text class="label" x="102" y="226">auth</text>
  <text class="small" x="102" y="251">schemas, api, pages</text>

  <rect class="box feature" x="280" y="190" width="190" height="100" />
  <text class="label" x="312" y="226">announcements</text>
  <text class="small" x="312" y="251">forms, filters, API</text>

  <rect class="box feature" x="500" y="190" width="180" height="100" />
  <text class="label" x="532" y="226">messages</text>
  <text class="small" x="532" y="251">thread, list, API</text>

  <rect class="box feature" x="710" y="190" width="180" height="100" />
  <text class="label" x="742" y="226">profile / moderation</text>
  <text class="small" x="742" y="251">member space, reports</text>

  <rect class="box shared" x="90" y="360" width="190" height="82" />
  <text class="label" x="122" y="394">src/components</text>
  <text class="small" x="122" y="418">UI historique</text>

  <rect class="box shared" x="320" y="360" width="170" height="82" />
  <text class="label" x="352" y="394">src/shared</text>
  <text class="small" x="352" y="418">helpers API</text>

  <rect class="box shared" x="530" y="360" width="170" height="82" />
  <text class="label" x="562" y="394">src/lib</text>
  <text class="small" x="562" y="418">api-client</text>

  <rect class="box shared" x="740" y="360" width="140" height="82" />
  <text class="label" x="772" y="394">src/config</text>
  <text class="small" x="772" y="418">env Zod</text>

  <rect class="box test" x="370" y="462" width="220" height="42" />
  <text class="small" x="420" y="488">src/test + e2e</text>

  <path class="arrow" d="M480 137 V178" />
  <path class="arrow" d="M480 137 C225 145 160 158 160 190" />
  <path class="arrow" d="M480 137 C375 153 375 166 375 190" />
  <path class="arrow" d="M480 137 C585 153 590 166 590 190" />
  <path class="arrow" d="M480 137 C795 145 800 160 800 190" />
  <path class="arrow" d="M375 290 C380 324 392 338 405 360" />
  <path class="arrow" d="M590 290 C600 322 610 338 615 360" />
  <path class="arrow" d="M800 290 C815 320 815 340 810 360" />
</svg>
`,
);

writeDiagram(
  'database.svg',
  `
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="430" viewBox="0 0 960 430" role="img" aria-labelledby="title desc">
  <title id="title">Flux données frontend API MariaDB</title>
  <desc id="desc">Diagramme du frontend vers API AdonisJS puis MariaDB, avec tests MSW et E2E Docker Compose.</desc>
  <style>
    text { font-family: Arial, sans-serif; fill: #252331; }
    .box { fill: #fff; stroke: #56469f; stroke-width: 2; rx: 12; }
    .front { fill: #f15f4f; stroke: #f15f4f; }
    .api { fill: #f5f2ff; }
    .db { fill: #eef7f1; stroke: #2f9c56; }
    .test { fill: #f8f8fb; stroke: #88829e; }
    .label { font-size: 18px; font-weight: 700; }
    .small { font-size: 14px; fill: #5d596b; }
    .white { fill: #fff; }
    .arrow { stroke: #56469f; stroke-width: 2; fill: none; marker-end: url(#arrow); }
  </style>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#56469f" />
    </marker>
  </defs>
  <rect x="40" y="35" width="880" height="345" fill="#f2f1f8" rx="18" />

  <rect class="box front" x="90" y="95" width="205" height="118" />
  <text class="label white" x="125" y="137">Frontend Vite</text>
  <text class="small white" x="125" y="162">React, Axios</text>
  <text class="small white" x="125" y="184">src/config/env.ts</text>

  <rect class="box api" x="385" y="95" width="205" height="118" />
  <text class="label" x="425" y="137">API AdonisJS</text>
  <text class="small" x="425" y="162">auth, annonces</text>
  <text class="small" x="425" y="184">messages, moderation</text>

  <rect class="box db" x="680" y="95" width="190" height="118" />
  <text class="label" x="740" y="137">MariaDB</text>
  <text class="small" x="727" y="162">dev / test / CI</text>
  <text class="small" x="727" y="184">migrations API</text>

  <rect class="box test" x="130" y="270" width="270" height="72" />
  <text class="label" x="163" y="302">Vitest + MSW</text>
  <text class="small" x="163" y="325">contrats HTTP frontend isolés</text>

  <rect class="box test" x="560" y="270" width="270" height="72" />
  <text class="label" x="592" y="302">Playwright + Compose</text>
  <text class="small" x="592" y="325">frontend + API + MariaDB</text>

  <path class="arrow" d="M295 154 H378" />
  <path class="arrow" d="M590 154 H672" />
  <path class="arrow" d="M265 270 C260 238 235 224 208 213" />
  <path class="arrow" d="M695 270 C690 238 724 224 775 213" />
</svg>
`,
);
