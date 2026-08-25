## Résumé fonctionnel

Décrire en français le comportement livré.

## Issue liée

Closes #

Utiliser `Fixes #123`, `Closes #123` ou `Resolves #123`. GitHub ne fermera
l'issue qu'après le merge effectif de la PR dans la branche par défaut.

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
docker compose run --rm frontend-tools npm ci
docker compose run --rm frontend-tools npm run check
docker compose build frontend-production
```

## Risques et revue

- Dépendance backend:
- Impact juridique:
- Impact sécurité:
- Impact UX:
