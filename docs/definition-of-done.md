# Definition Of Done

Ce document définit le minimum requis avant de considérer une issue frontend terminée.

## Règles Générales

- Une issue = une branche = une PR.
- Le scope de la PR doit rester limité à l'issue.
- Les titres, descriptions fonctionnelles et critères d'acceptation sont en français.
- Les détails techniques, commandes, endpoints, champs et noms de code restent en anglais.
- Tout changement de statut spec/code doit mettre à jour `docs/traceability.md`.

## Frontend

Une issue frontend est terminée uniquement si:

- Les appels API utilisent `VITE_API_URL` ou la base URL Axios.
- Aucun nouvel appel hardcodé à `http://localhost:5000` n'est ajouté.
- Les noms de champs envoyés correspondent au contrat backend.
- Les contrôles conformité/sécurité ne reposent pas uniquement sur des boutons désactivés.
- Les états d'erreur backend sont affichés quand c'est utile.

Quality gates obligatoires:

```bash
docker run --rm \
  -v "$PWD":/app \
  -v chaye_web_frontend_node_modules:/app/node_modules \
  -w /app \
  -e VITE_API_URL=http://host.docker.internal:3333 \
  node:20-alpine \
  sh -lc "npm ci && npm run lint && npm test -- --watchAll=false && npm run typecheck && npm run build"
```

## UI

Si l'UI change:

- Ajouter un screenshot dans la PR.
- Vérifier les routes touchées.
- Vérifier que les textes ne débordent pas sur mobile et desktop.

## Documentation

Mettre à jour au minimum un des fichiers suivants si le comportement change:

- `docs/spec-v3.1.md`
- `docs/traceability.md`
- `docs/code-vs-spec.md`
- `docs/api-contracts.md`
