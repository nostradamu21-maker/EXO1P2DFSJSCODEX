# TESTP2CODEX-JS

Ce projet reproduit l'application Angular fournie dans `TESTP2CODEX`, mais avec une pile 100 % JavaScript/Node.js et une structure volontairement difficile à maintenir. L'objectif pédagogique est identique : analyser le code, identifier les problèmes techniques et structurels, puis repenser une architecture front soigneuse.

## Démarrage rapide

```bash
npm install
npm start
```

L'application écoute sur [http://localhost:3000](http://localhost:3000). Le serveur Express expose les fichiers statiques depuis `public/` et l'API `GET /api/olympic` qui lit directement `public/assets/mock/olympic.json` à chaque requête.

## Points d'attention (volontairement "mauvais")

- Toute la logique front est regroupée dans `public/app.js` avec des variables globales et des fonctions volumineuses.
- Les composants de page (`index.html`, `country.html`) dupliquent le markup et s'appuient sur des sélecteurs `id` fragiles.
- Le backend relit le JSON de manière synchrone et expose `node_modules/` pour alimenter Chart.js côté client.
- Aucun typage, aucune séparation front/back, aucune stratégie d'erreur ou de tests : c'est à l'étudiant de remettre de l'ordre.

Bon courage pour le refactoring !
