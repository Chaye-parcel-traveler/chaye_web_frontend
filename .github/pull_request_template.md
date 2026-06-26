## Résumé fonctionnel

Décrire en français le comportement livré.

## Issue liée

Closes #

## Détails techniques

Use English for code-level details, API contracts, fields, commands, and implementation notes.

## Checklist

- [ ] Le scope reste limité à l'issue liée.
- [ ] Les règles de langue sont respectées.
- [ ] Les appels API utilisent `VITE_API_URL` ou la base URL Axios.
- [ ] Aucun nouveau `http://localhost:5000` n'est ajouté.
- [ ] Les contrôles sécurité/conformité ne reposent pas uniquement sur l'UI.
- [ ] Aucun Markdown n'est modifié par défaut; toute exception est justifiée.
- [ ] Screenshots ajoutés si l'UI change visuellement.

## Quality gates

Coller les commandes lancées et leur résultat.

```text
docker run --rm ... npm ci && npm run lint && npm test -- --watchAll=false && npm run typecheck && npm run build
docker build --build-arg VITE_API_URL=http://localhost:3333 -t chaye-web-frontend .
```

## Risques et revue

- Dépendance backend:
- Impact juridique:
- Impact sécurité:
- Impact UX:
