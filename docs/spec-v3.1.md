# Chaye Spec V3.1 - Notes Frontend

La spécification produit complète est maintenue dans `../chaye_API/docs/spec-v3.1.md`.
Ce fichier liste les surfaces frontend prioritaires pour les agents.

Dernière synchronisation: 2026-06-24.

## Règle De Langue

- Les tickets, règles métier, critères d'acceptation et spécificités fonctionnelles sont rédigés en français.
- Le code, les noms de champs, les endpoints, les commandes, les labels d'automatisation et les spécifications techniques restent en anglais.

## Exigences UI Bloquantes Pour Le Lancement

### LEG-001 - Mentions légales

Les mentions légales doivent être accessibles sans authentification:

- Depuis le footer.
- Depuis l'écran de connexion.

Champs à afficher une fois fournis:

- Nom de la société.
- Numéro RCS.
- Adresse.
- Email de contact.
- Hébergeur.

Ne pas inventer les données juridiques manquantes. Les marquer clairement comme en attente.

### LEG-002 - Acceptation des CGU

L'inscription doit inclure une case CGU obligatoire.

Comportement attendu:

- La soumission est bloquée si la case n'est pas cochée.
- La version des CGU acceptée est envoyée au backend.
- Lors d'une future mise à jour des CGU, un flux authentifié devra appeler l'endpoint d'acceptation.

### LEG-003 - Signalements

Ajouter une action "Signaler" sur:

- Profil utilisateur.
- Annonce.
- Trajet, quand l'UI trajet existe.
- Message in-app, quand l'UI message est raccordée au backend.

Formulaire de signalement:

- Type: contenu illicite, comportement suspect, faux profil, autre.
- Description optionnelle.

### LEG-004 - Modération admin

L'interface admin doit afficher:

- Liste des signalements.
- Filtres: en attente, traité, classé.
- Actions: classer sans suite, avertir, suspendre.
- Signalements en attente depuis plus de 48h mis en évidence.

Le backend doit fournir l'autorisation et les données de SLA.

### LEG-005 - Comptes suspendus

Les utilisateurs suspendus:

- Doivent voir un message clair sur le statut du compte.
- Ne doivent pas voir d'action de publication, réservation ou message.
- Les erreurs backend doivent rester affichées, car l'application ne doit pas dépendre uniquement des boutons désactivés.

### LEG-006 - Mineurs

L'inscription doit collecter la date de naissance.

Les mineurs:

- Peuvent créer un compte.
- Ne peuvent pas publier une annonce.
- Ne peuvent pas réserver.
- Doivent voir: "Tu dois avoir 18 ans pour effectuer des transactions sur Chaye."

## Notes Frontend Actuelles

- Les pages login, signup, profile, members, announcements, package, messages, footer et legal existent déjà comme composants.
- L'application utilise plusieurs bibliothèques UI. Préférer la cohérence locale sur les écrans touchés au lieu d'introduire une nouvelle bibliothèque.
- Le branding pourra évoluer vers l'identité colibri plus tard. Ne pas faire de refonte visuelle dans les tickets de conformité juridique.

