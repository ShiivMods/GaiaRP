# PROJECT.md — RP SF / Gaïa RP

**Projet :** RP SF / Gaïa RP  
**Type :** Projet personnel — application web de support à un jeu de rôle écrit de science-fiction  
**Dépôt de référence :** `ShiivMods/GaiaRP`  
**Branche de référence :** `main`  
**Statut :** Développement actif  
**Dernière restructuration documentaire :** 23 septembre 2026

---

# 1. Rôle de ce document

Ce fichier constitue le cadre général et durable du projet.

Il est notamment destiné à permettre à l’assistant de reprendre correctement le développement lors de conversations futures sans dépendre exclusivement de l’historique des échanges.

Il doit documenter principalement :

- le contexte général ;
- les objectifs du projet ;
- l’état et l’architecture générale de l’application ;
- les technologies utilisées ;
- les conventions structurelles ;
- les règles permanentes de développement ;
- les principes UX/UI généraux ;
- l’organisation de la documentation ;
- les consignes à respecter pendant toute intervention sur le projet.

`PROJECT.md` ne doit pas devenir la documentation exhaustive de toutes les mécaniques du jeu.

Lorsqu’un système possède suffisamment de règles propres, celles-ci doivent être placées dans un fichier spécialisé.

---

# 2. Référence technique absolue : GitHub

Le projet est versionné sur GitHub.

La référence technique actuelle est toujours :

**la version présente sur la branche `main` du dépôt `ShiivMods/GaiaRP`.**

Cette règle prime sur :

- les anciennes archives ZIP ;
- les anciennes versions de développement ;
- les numéros de version mémorisés dans les conversations ;
- les anciennes branches ;
- les anciennes copies locales ;
- les souvenirs de l’état du projet.

Lorsqu’une intervention nécessite de connaître l’état actuel du code, **consulter le dépôt GitHub avant de travailler**.

Ne jamais choisir automatiquement une ancienne version comme base simplement parce qu’elle a précédemment été considérée comme stable.

Ne jamais supposer non plus qu’un ancien numéro de développement reste la version actuelle.

## 2.1 État audité lors de la rédaction

Au 23 septembre 2026, l’état présent sur `main` correspond notamment à :

- version déclarée : `0.6.0-dev.52` ;
- dernier commit observé : `Routing v1 + ajouts` ;
- routing v1 fonctionnel ;
- déploiement automatisé sur GitHub Pages.

Ces informations constituent uniquement une photographie de l’état actuel au moment de la rédaction.

**Elles ne doivent jamais être utilisées pour revenir à cette version si `main` a évolué depuis.**

---

# 3. Distinction entre état technique et comportement souhaité

Deux questions différentes doivent toujours être distinguées.

## Que contient actuellement le projet ?

Pour répondre à cette question, la référence est :

**le code actuel de `main` sur GitHub.**

## Comment le projet doit-il fonctionner ?

Pour répondre à cette question, utiliser en priorité :

1. les instructions les plus récentes de l’utilisateur ;
2. les décisions explicitement validées ;
3. la documentation spécialisée du système concerné ;
4. `SCOPE.md` ;
5. `PROJECT.md` ;
6. les autres documents du projet ;
7. le comportement actuel du code ;
8. les anciennes conversations.

Une décision récente remplace une décision ancienne incompatible.

Si le comportement actuel du code et la documentation validée divergent, ne pas corriger silencieusement l’un ou l’autre.

Identifier la divergence et déterminer quel comportement doit être conservé.

---

# 4. Principe fondamental de la restructuration documentaire

RP SF est un projet existant et déjà largement développé.

La restructuration actuelle de la documentation **n’est pas une refonte du projet**.

Par défaut :

- conserver les fonctionnalités existantes ;
- conserver les données existantes ;
- conserver les comportements non concernés par une demande ;
- ne pas supprimer une fonctionnalité simplement parce qu’elle n’est pas encore documentée ;
- ne pas réinterpréter une mécanique existante sans raison ;
- ne pas implémenter automatiquement une idée découverte pendant la documentation.

L’objectif actuel est d’obtenir progressivement une documentation fidèle au projet réel.

Une suggestion reste une suggestion jusqu’à validation explicite.

---

# 5. Présentation du projet

RP SF / Gaïa RP est une application web destinée à servir de support à un jeu de rôle écrit de science-fiction.

Le site ne remplace pas le RP écrit.

Il fournit l’environnement et les outils nécessaires à son fonctionnement.

Le projet comprend ou doit progressivement permettre de gérer notamment :

- les membres / joueurs ;
- les personnages joueurs et non-joueurs ;
- les dynasties ;
- les vaisseaux ;
- les équipages ;
- les RP ;
- la carte galactique ;
- les lieux ;
- les missions ;
- les événements ;
- la progression ;
- l’économie ;
- les voyages ;
- les combats ;
- le lore ;
- les factions ;
- les espèces ;
- les religions ;
- les découvertes et technologies ;
- les outils nécessaires aux MJ et à l’administration.

---

# 6. Philosophie générale

## 6.1 Le RP reste prioritaire

Les mécaniques du site servent le RP.

Le site ne doit pas chercher à automatiser tout ce qui pourrait techniquement l’être.

Certaines décisions doivent rester sous contrôle humain lorsqu’elles nécessitent :

- une interprétation narrative ;
- une décision du MJ ;
- une appréciation contextuelle ;
- un arbitrage RP.

## 6.2 Rôle de l’automatisation

L’automatisation est pertinente lorsqu’elle permet notamment de :

- réduire les tâches répétitives ;
- éviter les erreurs de calcul ;
- conserver un état cohérent ;
- appliquer une conséquence déjà validée ;
- faciliter la consultation ;
- simplifier la gestion du jeu.

Une mécanique ne doit pas devenir artificiellement complexe simplement pour être entièrement automatisée.

## 6.3 Contrôle du MJ

Le projet doit conserver des outils permettant aux MJ de contrôler les systèmes structurants du jeu.

Le site doit faciliter leurs interventions plutôt que chercher à les remplacer.

Les détails des pouvoirs et outils MJ seront documentés dans les systèmes concernés.

---

# 7. Objectifs généraux

## 7.1 Joueurs

L’application doit permettre à un joueur de retrouver facilement :

- son personnage ;
- ses informations ;
- ses RP ;
- sa progression ;
- son vaisseau et/ou son équipage lorsque pertinent ;
- les informations du monde auxquelles il a accès ;
- les outils nécessaires à ses actions.

L’interface doit rester compréhensible même lorsque les mécaniques sous-jacentes sont complexes.

## 7.2 MJ / administration

L’application doit progressivement permettre de gérer les données du jeu sans devoir modifier directement le code pour les opérations courantes lorsque cela est raisonnablement possible.

Les outils d’administration doivent privilégier :

- la lisibilité ;
- la rapidité ;
- la cohérence ;
- la sécurité ;
- la limitation des tâches répétitives ;
- la traçabilité lorsque nécessaire.

## 7.3 Cohérence du monde

Les systèmes doivent fonctionner ensemble.

Une modification concernant un système central doit prendre en compte ses dépendances éventuelles avec les autres systèmes.

Exemples :

- personnage ↔ dynastie ;
- personnage ↔ vaisseau ;
- personnage ↔ compétences ;
- RP ↔ personnage ;
- RP ↔ localisation ;
- vaisseau ↔ équipage ;
- carte ↔ voyages ;
- faction ↔ économie ;
- temps ↔ progression ;
- combat ↔ vaisseaux.

## 7.4 Maintenabilité

Le projet doit rester maintenable malgré son augmentation progressive de taille.

Éviter :

- la duplication inutile ;
- les règles dispersées dans plusieurs endroits ;
- les valeurs importantes non documentées ;
- les fonctions différentes réalisant le même travail ;
- les fichiers devenant massifs sans nécessité ;
- les correctifs temporaires accumulés ;
- la surarchitecture.

---

# 8. Stack technique actuelle

La stack technique doit être vérifiée sur GitHub lorsqu’elle est nécessaire à une intervention.

Au moment de la rédaction, le projet utilise :

- **React** ;
- **React DOM** ;
- **TypeScript** ;
- **Vite** ;
- modules ES.

Le projet utilise actuellement TypeScript en mode strict.

Le build de production est effectué avec Vite.

---

# 9. Structure technique actuelle

La structure exacte du dépôt peut évoluer.

Toujours consulter GitHub avant une modification structurelle.

L’organisation actuelle repose notamment sur :

```text
/
├── .github/
│   └── workflows/
├── public/
├── src/
│   ├── features/
│   ├── utils/
│   ├── world/
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.ts
│   └── styles.css
├── CHANGELOG.md
├── PROJECT.md
├── README.md
├── package.json
├── tsconfig.json
└── tsconfig.app.json
```

Cette représentation est indicative.

Le dépôt GitHub reste la source de vérité concernant la structure réelle.

---

# 10. Organisation fonctionnelle actuelle

Le projet utilise déjà une organisation par fonctionnalités dans `src/features/`.

Les modules observés comprennent notamment :

- `account` ;
- `characters` ;
- `combat` ;
- `dynasty` ;
- `events` ;
- `lore` ;
- `members` ;
- `missions` ;
- `rp` ;
- `ships`.

Les données et fonctions liées au monde et à la navigation spatiale sont notamment regroupées sous :

`src/world/`

Les fonctions utilitaires transversales doivent rester dans des modules appropriés plutôt que dans des composants sans rapport.

---

# 11. `App.tsx`

`src/App.tsx` constitue actuellement le principal point d’orchestration de l’application.

Il gère encore une quantité importante :

- d’état global ;
- de navigation ;
- de sélection ;
- de carte ;
- de coordination entre modules.

Cela décrit l’état actuel du projet, pas nécessairement son architecture définitive.

Ne pas lancer une refonte de `App.tsx` uniquement parce que ce fichier est important.

Si son découpage devient nécessaire, cette refonte devra être décidée et réalisée explicitement.

---

# 12. Routing actuel

Le projet dispose d’un routing léger développé spécifiquement pour son architecture actuelle.

Le système repose notamment sur :

`src/router.ts`

et sur l’**History API** du navigateur.

Il ne dépend actuellement pas d’un framework de routing externe tel que React Router.

## 12.1 Fonctions actuellement prises en charge

Le routeur permet notamment :

- `pushState` ;
- `replaceState` ;
- gestion du bouton précédent/suivant ;
- restauration d’une route après chargement ;
- normalisation des routes ;
- génération de slugs ;
- prise en compte du `BASE_URL` de Vite.

## 12.2 Routes principales

Les routes actuellement gérées comprennent notamment des chemins pour :

```text
/
├── /pont
├── /carte
├── /carte/secteurs/:id
├── /carte/systemes/:id
├── /carte/systemes/:id/objets/:id
├── /membres
├── /personnages/:id
├── /dynasties/:id
├── /vaisseaux/:id
├── /vaisseaux/:id/configuration
├── /rp/:id
├── /combat/:id
├── /lore/...
├── /evenements
├── /compte
└── /admin
```

Cette liste doit être considérée comme descriptive de l’état actuel.

Elle peut évoluer avec le projet.

## 12.3 Principe du routing

Le routing doit permettre :

- d’utiliser précédent / suivant ;
- de rafraîchir une page ;
- de partager un lien ;
- d’accéder directement à une fiche lorsque cela est prévu ;
- de conserver une navigation cohérente.

Le système doit rester proportionné aux besoins du projet.

Ne pas introduire automatiquement un framework de routing plus lourd si la solution actuelle répond correctement au besoin.

---

# 13. GitHub Pages

Le projet est actuellement déployé via **GitHub Pages**.

Le déploiement est automatisé par GitHub Actions lors d’un push sur `main`.

Le workflow :

1. récupère le projet ;
2. installe Node.js ;
3. exécute `npm ci` ;
4. construit le projet avec Vite ;
5. publie le contenu de `dist`.

Le build GitHub Pages utilise actuellement une base :

`/GaiaRP/`

---

# 14. Compatibilité avec le sous-dossier GitHub Pages

Le projet doit fonctionner à la fois :

- en développement local sous `/` ;
- sous le chemin `/GaiaRP/` utilisé par GitHub Pages.

Les assets publics utilisent actuellement un résolveur basé sur :

`import.meta.env.BASE_URL`

via :

`src/utils/assets.ts`

Ne pas réintroduire de chemins absolus cassant le déploiement sous `/GaiaRP/`.

---

# 15. Compatibilité des routes avec GitHub Pages

Le routing par History API doit tenir compte des limites d’un hébergement statique comme GitHub Pages.

Le projet possède un mécanisme permettant de restaurer les routes directes lors du chargement de la SPA.

Toute modification importante du routing doit vérifier au minimum :

- navigation interne ;
- précédent / suivant ;
- rafraîchissement ;
- lien direct ;
- fonctionnement local ;
- fonctionnement sous GitHub Pages.

---

# 16. Architecture : principes permanents

## 16.1 Séparation des responsabilités

Lorsque cela est raisonnable, séparer :

**Données → Logique → Interface**

Éviter de placer de grandes quantités de données métier directement dans des composants d’interface si une structure dédiée est plus appropriée.

## 16.2 Source unique

Une même information centrale ne doit pas être maintenue indépendamment dans plusieurs endroits.

Lorsqu’un objet possède un identifiant stable, les relations doivent privilégier cet identifiant plutôt que son nom affiché.

Un changement de nom ne doit pas casser inutilement les relations.

## 16.3 Modularité

Les fonctionnalités importantes doivent rester identifiables dans l’architecture.

Un système ne doit pas être ajouté à un fichier sans rapport uniquement parce que cet emplacement est pratique à court terme.

## 16.4 Réutilisation raisonnable

Avant de créer une nouvelle fonction ou logique, vérifier si un comportement équivalent existe déjà.

Préférer une réutilisation claire à une duplication.

Ne pas créer d’abstraction générique prématurée sans besoin concret.

## 16.5 Pas de surarchitecture

Le projet doit rester proportionné à ses besoins.

Ne pas introduire automatiquement :

- une nouvelle bibliothèque ;
- un framework supplémentaire ;
- une couche d’abstraction ;
- un service externe ;
- une architecture complexe ;

lorsqu’une solution plus simple répond correctement au besoin.

---

# 17. Données du jeu

Les données structurantes doivent autant que possible être séparées de leur affichage.

Le projet utilise déjà plusieurs fichiers et structures de données dédiés.

Cette approche doit être poursuivie lorsque pertinente.

Une règle importante ne doit pas être dupliquée dans plusieurs composants uniquement pour faciliter son affichage.

---

# 18. Documentation du projet

La documentation fait partie du projet.

La structure documentaire cible comporte au minimum :

```text
/
├── PROJECT.md
├── SCOPE.md
├── SECURITY.md
├── CHECKLIST.md
├── README.md
└── docs/
```

D’autres documents seront ajoutés progressivement.

---

# 19. Rôle des documents principaux

## `PROJECT.md`

Cadre général et permanent.

Il contient :

- vision ;
- architecture générale ;
- conventions ;
- méthode de travail ;
- règles structurelles.

## `SCOPE.md`

Détermine notamment :

- ce qui appartient au projet ;
- ce qui appartient à la version actuelle ;
- les fonctionnalités incluses ;
- les exclusions ;
- les objectifs ;
- les contraintes ;
- les critères d’acceptation.

## `SECURITY.md`

Documente notamment :

- les risques ;
- l’authentification ;
- les permissions ;
- les données ;
- les secrets ;
- les services ;
- les sauvegardes ;
- les incidents ;
- les tests de sécurité.

## `CHECKLIST.md`

Suit l’avancement global du projet.

Elle doit être mise à jour au fur et à mesure.

Les éléments non applicables doivent être explicitement identifiés `N/A` lorsque pertinent.

## `README.md`

Document destiné principalement à présenter le projet et permettre sa prise en main générale.

Il ne remplace pas les documents internes de conception.

---

# 20. Documentation spécialisée

Les mécaniques complexes doivent progressivement être déplacées vers des documents spécialisés.

Exemples probables :

```text
docs/
├── DESIGN_RULES.md
├── MEMBERS.md
├── CHARACTERS.md
├── DYNASTIES.md
├── SKILLS.md
├── TIME_AND_RP.md
├── RP_SYSTEM.md
├── SHIPS.md
├── SPACE_TRAVEL.md
├── SPACE_COMBAT.md
├── ECONOMY.md
├── MISSIONS.md
├── WORLD_MAP.md
├── LORE.md
├── PERMISSIONS.md
└── ...
```

Cette liste n’impose pas la création immédiate de ces fichiers.

Ils doivent être créés uniquement lorsque leur contenu est travaillé.

---

# 21. Ne pas inventer de règles

Lorsqu’une règle nécessaire au développement n’est pas documentée :

1. vérifier les documents du projet ;
2. vérifier le code actuel ;
3. vérifier les décisions récentes ;
4. vérifier les anciennes discussions si nécessaire.

Si la réponse reste réellement inconnue, ne pas inventer.

Demander une décision ou proposer plusieurs possibilités clairement identifiées comme telles.

---

# 22. Ne pas développer une suggestion

Une suggestion peut être formulée lorsqu’elle permet d’identifier :

- une incohérence ;
- un risque ;
- une amélioration UX ;
- une amélioration technique ;
- un problème de sécurité ;
- un oubli probable ;
- une simplification intéressante.

Mais une suggestion ne constitue jamais une autorisation de développement.

Attendre une validation explicite lorsqu’elle modifie le comportement ou le périmètre.

---

# 23. Aucune génération implicite

Ne jamais lancer automatiquement :

- une modification du code ;
- une création de fichier ;
- une suppression ;
- une génération d’archive ;
- une génération de contenu ;
- une génération d’image ;
- une refonte ;

simplement parce qu’une idée est discutée.

Une discussion, une analyse ou une validation conceptuelle ne constitue pas une demande d’exécution.

---

# 24. Modes de travail

Deux modes peuvent être utilisés :

- `ZIP COMPLET`
- `PAS À PAS`

Le mode utilisé précédemment pour le projet est conservé tant qu’un changement n’est pas explicitement demandé.

Le mode de travail ne doit jamais être changé automatiquement.

---

# 25. Mode ZIP COMPLET

Lorsque le travail est demandé sous forme de ZIP complet :

- récupérer ou utiliser la version GitHub actuelle comme base ;
- ne pas repartir d’une ancienne archive ;
- modifier uniquement ce qui est nécessaire ;
- préserver les fonctionnalités non concernées ;
- vérifier autant que possible le projet ;
- fournir une archive complète.

Une ancienne archive éventuellement fournie doit être considérée comme une pièce de contexte sauf si l’utilisateur indique explicitement qu’elle devient la nouvelle base.

---

# 26. Mode PAS À PAS

Si le travail est explicitement réalisé en mode pas à pas, chaque modification doit indiquer :

- chemin exact ;
- fichier exact ;
- emplacement précis ;
- action ;
- contenu ;
- courte explication.

Actions :

- `CRÉER`
- `AJOUTER`
- `REMPLACER`
- `SUPPRIMER`

Lorsqu’un contenu existant doit être remplacé, utiliser directement `REMPLACER`.

Ne jamais supposer que l’utilisateur sait où placer un morceau de code.

---

# 27. Niveau d’explication

Les explications doivent être :

- courtes ;
- concrètes ;
- liées à l’étape en cours ;
- compréhensibles sans connaissance implicite avancée.

Le niveau technique de l’utilisateur évolue et ne doit pas être artificiellement sous-estimé.

En revanche, une difficulté ou un risque réel ne doit pas être masqué pour simplifier l’explication.

---

# 28. Ne pas mélanger les projets

RP SF possède :

- ses propres règles ;
- sa propre architecture ;
- son propre lore ;
- ses propres données ;
- ses propres contraintes.

Ne jamais importer automatiquement une solution ou une convention provenant d’un autre projet.

Une approche utilisée ailleurs peut être proposée, mais son intégration doit être décidée spécifiquement pour RP SF.

---

# 29. UX / UI — principes généraux

L’interface doit rester :

- moderne ;
- cohérente ;
- lisible ;
- science-fiction ;
- fonctionnelle ;
- immersive sans sacrifier l’ergonomie.

La cohérence visuelle entre les différentes sections est importante.

Des composants remplissant le même rôle doivent autant que possible conserver des comportements similaires.

---

# 30. Lisibilité

Privilégier :

- une taille de texte confortable ;
- une hiérarchie visuelle claire ;
- des espacements cohérents ;
- des actions facilement identifiables ;
- des états compréhensibles.

Éviter de condenser artificiellement l’interface uniquement pour afficher davantage d’informations.

---

# 31. Responsive

Les interfaces doivent être conçues pour rester utilisables sur différentes tailles d’écran lorsque cela est pertinent.

Une interface complexe destinée au bureau ne doit pas simplement être réduite jusqu’à devenir inutilisable sur mobile.

Le comportement mobile des systèmes complexes doit être réfléchi au cas par cas.

---

# 32. Règles de design spécialisées

Les conventions détaillées concernant notamment :

- avatars ;
- grands avatars ;
- mini-avatars ;
- illustrations ;
- vaisseaux ;
- panneaux ;
- cartes ;
- couleurs ;
- typographie ;
- composants ;

doivent progressivement être centralisées dans une documentation de design dédiée.

Ne pas surcharger `PROJECT.md` de règles graphiques spécifiques à un seul composant.

---

# 33. Lore

Le lore fait partie intégrante du projet.

Ne jamais inventer une information canonique pour compléter une interface ou un document.

Lorsqu’une information n’est pas encore définie :

- l’indiquer comme telle ;
- ou proposer des possibilités séparément.

Une proposition n’est canonique qu’après validation.

---

# 34. Lore et mécaniques

Distinguer :

- les faits de l’univers ;
- les règles de jeu ;
- les représentations techniques ou simplifications de l’application.

Une contrainte technique ne doit pas modifier silencieusement le lore.

Inversement, toutes les règles narratives n’ont pas nécessairement besoin d’une automatisation informatique.

---

# 35. Permissions et confidentialité

Le projet prévoit différents niveaux ou contextes d’accès.

Les permissions détaillées doivent être documentées séparément.

Principe général :

**masquer une information dans l’interface ne constitue pas une protection de sécurité.**

Lorsqu’une donnée doit réellement être confidentielle, sa protection doit être réalisée au niveau technique approprié.

---

# 36. Sécurité

`SECURITY.md` constitue la référence détaillée de sécurité.

Les principes généraux suivants s’appliquent cependant en permanence :

- aucun secret réel dans Git ;
- aucun secret confidentiel dans le frontend ;
- validation des entrées non fiables ;
- contrôle des permissions au niveau adapté ;
- protection des interfaces administratives ;
- limitation des accès au nécessaire ;
- prise en compte des données personnelles ;
- sauvegardes lorsque nécessaires ;
- sécurité considérée dès la conception.

---

# 37. Dépendances

Avant d’ajouter une dépendance importante, évaluer :

- son utilité réelle ;
- sa maintenance ;
- sa licence ;
- sa sécurité ;
- son coût éventuel ;
- sa pérennité ;
- sa difficulté de remplacement.

Le projet utilise actuellement relativement peu de dépendances principales.

Éviter d’alourdir inutilement cette base.

---

# 38. Corrections

Lorsqu’un bug apparaît :

1. rechercher sa cause ;
2. éviter d’empiler des contournements temporaires ;
3. corriger la cause lorsque raisonnablement possible ;
4. vérifier les systèmes liés ;
5. tester la régression éventuelle.

Si une ancienne modification était mauvaise, le signaler et la corriger proprement.

---

# 39. Modifications importantes

Avant une modification structurelle importante :

1. consulter la version actuelle sur GitHub ;
2. identifier les fichiers concernés ;
3. identifier les dépendances ;
4. vérifier la documentation du système ;
5. conserver les comportements qui ne doivent pas changer ;
6. effectuer la modification ;
7. tester ;
8. mettre à jour la documentation si nécessaire.

Une demande ciblée n’autorise pas une refonte générale.

---

# 40. Tests

Une fonctionnalité n’est pas terminée simplement parce que son interface s’affiche.

Selon le système, vérifier notamment :

- cas nominal ;
- erreurs ;
- cas limites ;
- navigation ;
- responsive ;
- permissions ;
- données ;
- interactions avec les autres systèmes ;
- régressions.

Pour le routing, vérifier systématiquement les comportements spécifiques définis dans la section correspondante.

---

# 41. État des fonctionnalités

Les fonctionnalités peuvent être :

- fonctionnelles ;
- partiellement fonctionnelles ;
- prototypes ;
- interfaces uniquement ;
- prévues ;
- abandonnées.

Ne pas présenter une interface comme une fonctionnalité terminée si la logique correspondante n’existe pas encore.

Ne pas implémenter une fonctionnalité future simplement parce qu’un placeholder existe déjà.

---

# 42. Changelog et versions

`CHANGELOG.md` doit décrire les modifications réellement effectuées.

Le numéro de version sert à identifier un état du projet.

Il ne doit pas être utilisé pour remplacer la règle principale :

**la version technique de référence est la version actuellement présente sur `main`.**

Les anciennes versions servent à comprendre l’historique ou récupérer ponctuellement une information lorsque nécessaire, pas à déterminer automatiquement la base de travail.

---

# 43. Documentation après développement

Lorsqu’une modification change durablement :

- une règle métier ;
- une convention ;
- l’architecture ;
- une dépendance ;
- un comportement important ;
- une contrainte ;

mettre à jour le document correspondant.

Une règle importante ne doit pas rester uniquement dans une conversation.

---

# 44. Restructuration documentaire actuelle

La documentation historique du projet contient actuellement un mélange de :

- règles générales ;
- architecture ;
- mécaniques de jeu ;
- roadmap ;
- décisions temporaires.

Cette documentation est progressivement reconstruite.

Ordre prévu :

1. `PROJECT.md` ;
2. `SCOPE.md` ;
3. `SECURITY.md` ;
4. `CHECKLIST.md` ;
5. documentation spécialisée des différents modules.

Chaque système spécialisé sera repris séparément.

Pendant cette restructuration, l’absence temporaire d’une règle dans un nouveau document ne signifie pas que cette règle est supprimée.

---

# 45. Règle de prudence

En cas de doute :

**ne pas inventer et ne pas revenir arbitrairement à une ancienne version.**

Pour l’état du projet, consulter GitHub.

Pour le comportement souhaité, consulter les décisions et la documentation les plus récentes.

Si une décision manque réellement, la demander.

---

# 46. Objectif final

RP SF doit progressivement devenir un projet :

- cohérent ;
- maintenable ;
- documenté ;
- testable ;
- sécurisé de façon adaptée ;
- compréhensible ;
- évolutif sans surarchitecture ;
- fidèle au lore et aux règles validées ;
- utilisable par les joueurs et MJ ;
- repris facilement sans dépendre d’informations présentes uniquement dans d’anciennes conversations.

Le projet doit pouvoir continuer à grandir sans que chaque nouvelle fonctionnalité fragilise les systèmes déjà établis.
