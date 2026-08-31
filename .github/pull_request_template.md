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
- [ ] Aucun secret n'est ajouté au dépôt.
- [ ] Screenshots ajoutés si l'UI change visuellement.

## Quality gates

Coller les commandes lancées et leur résultat.

```text
pnpm install --frozen-lockfile
pnpm run check
pnpm audit
docker compose build frontend-production
```

## Risques et revue

- Dépendance backend:
- Impact juridique:
- Impact sécurité:
- Impact UX:
