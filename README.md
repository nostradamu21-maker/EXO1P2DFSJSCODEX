# OlympicGamesStarter

Bienvenue ! Cette application a été volontairement laissée dans un état peu maintenable afin que vous puissiez analyser son architecture, repérer les mauvaises pratiques et proposer un refactoring complet.

## Installation

```bash
npm install
```

## Serveur de développement

```bash
npm start
```

Le serveur Express démarre sur [http://localhost:3000](http://localhost:3000). Il expose :

- les fichiers statiques contenus dans `public/` ;
- l’API `GET /api/olympic` qui renvoie le contenu de `public/assets/mock/olympic.json`.

Chaque modification des fichiers JavaScript ou HTML nécessite un rafraîchissement manuel dans le navigateur.

## Où commencer ?

Une structure existe déjà, même si elle n’est pas idéale. Prenez le temps d’explorer les fichiers suivants :

- `public/app.js` (tout le code front-y est regroupé) ;
- `server.js` (lecture synchrone du JSON, exposition de `node_modules/`) ;
- `public/index.html` et `public/country.html` (duplication et accès DOM via des `id`).

## Votre mission

1. Cartographier les mauvaises pratiques (architecture, logique, dette technique) et les noter dans `notes-architecture.md`.
2. Proposer une organisation plus claire (modules, services, composants, gestion des données).
3. Refactoriser progressivement le code pour appliquer votre architecture cible.
4. Centraliser les accès aux données (fichier JSON aujourd’hui, API demain).
5. Documenter votre nouvelle structure dans `ARCHITECTURE.md`.

Vous êtes libres d’adapter l’arborescence : créez un dossier `src/` si besoin, introduisez des modules ES, extrayez des composants, etc. Gardez simplement à l’esprit la finalité pédagogique : rendre le code lisible, testable et évolutif.

Bonne analyse et bon refactoring !
