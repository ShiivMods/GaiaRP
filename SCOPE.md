# SCOPE.md — Périmètre du projet RP SF / Gaïa RP

> Ce fichier définit ce qui appartient au projet, ce qui existe actuellement, ce qui est prévu et ce qui ne fait pas partie du périmètre actuel.
>
> Il ne remplace pas les documentations détaillées des différents systèmes.
>
> La référence technique de l’état actuel est toujours la branche `main` du dépôt `ShiivMods/GaiaRP`.
>
> Une fonctionnalité présente dans l’interface n’est pas automatiquement considérée comme terminée.
>
> Une rubrique non applicable doit être indiquée `N/A` avec une justification plutôt que supprimée.

---

# 0. Statuts utilisés

Pour éviter de confondre interface, prototype, fonctionnalité réelle et roadmap, les statuts suivants sont utilisés.

### `EXISTANT`

La fonctionnalité possède une implémentation réellement utilisable dans le prototype actuel.

Cela ne signifie pas nécessairement qu’elle est définitive.

### `PARTIEL`

Une partie significative fonctionne, mais le système est incomplet ou dépend encore de données de démonstration, d’état local ou de fonctionnalités futures.

### `PROTOTYPE`

Une interface ou une mécanique de démonstration existe principalement pour tester le fonctionnement ou l’UX.

Elle ne doit pas être considérée comme une fonctionnalité de production.

### `PRÉVU`

La fonctionnalité appartient bien au projet et son principe est validé, mais son implémentation n’est pas encore suffisante.

### `FUTUR`

Évolution envisagée ou logique à terme, mais qui ne fait pas partie du travail immédiat.

### `À CONFIRMER`

Une décision supplémentaire est nécessaire avant de considérer l’élément comme faisant partie du périmètre.

### `EXCLU`

L’élément ne fait pas partie du périmètre actuel.

---

# 1. Identification du projet

- **Nom du projet :** RP SF / Gaïa RP
- **Type :** Projet personnel
- **Nature :** Application web de support à un jeu de rôle écrit de science-fiction
- **Dépôt :** `ShiivMods/GaiaRP`
- **Branche technique de référence :** `main`
- **Version du périmètre :** Périmètre global évolutif du projet
- **État technique audité lors de la création :** `0.6.0-dev.52`
- **Date de création de ce périmètre :** 2026-09-23
- **Responsable du projet :** Propriétaire de RP SF / Gaïa RP

## Documents de référence

- [x] `PROJECT.md`
- [x] `SCOPE.md`
- [x] `SECURITY.md`
- [x] `CHECKLIST.md`
- [x] `README.md`
- [x] `CHANGELOG.md`
- [ ] Documentation spécialisée — restructuration progressive
- [N/A] Devis — projet personnel
- [N/A] Contrat client — projet personnel

---

# 2. Référence de l’état actuel

L’état technique actuel ne doit jamais être déterminé à partir d’une ancienne archive ou d’un ancien numéro mémorisé.

La référence est toujours :

**la version présente sur `main` dans le dépôt GitHub.**

Lors de la rédaction de ce document, le dépôt contient notamment :

- React ;
- TypeScript ;
- Vite ;
- déploiement GitHub Pages ;
- routing léger basé sur l’History API ;
- organisation fonctionnelle sous `src/features/` ;
- données du monde sous `src/world/` ;
- plusieurs modules déjà interactifs ;
- plusieurs interfaces encore explicitement identifiées comme prototypes.

L’indication `0.6.0-dev.52` constitue uniquement une photographie de l’état audité le 23 septembre 2026.

Elle ne constitue pas une base figée.

---

# 3. Résumé du besoin

## Problème à résoudre

Un jeu de rôle écrit de science-fiction comportant de nombreux personnages, lieux, vaisseaux, règles, informations de lore et systèmes de progression devient rapidement difficile à gérer uniquement avec un forum classique ou des informations dispersées.

Les joueurs doivent pouvoir retrouver facilement les informations nécessaires à leur RP.

Les MJ doivent pouvoir suivre et modifier l’état du monde sans multiplier les opérations manuelles ni perdre la cohérence entre les différents systèmes.

## Solution attendue

RP SF doit fournir une plateforme web centralisée réunissant progressivement :

- le RP écrit ;
- les personnages ;
- les comptes joueurs ;
- les dynasties ;
- les vaisseaux ;
- les équipages ;
- la carte du monde ;
- les lieux ;
- les missions ;
- le temps de jeu ;
- la progression ;
- le combat ;
- l’économie ;
- le lore ;
- les outils d’administration nécessaires aux MJ.

Le site doit automatiser les tâches réellement utiles tout en laissant aux MJ le contrôle des décisions nécessitant une interprétation narrative.

---

# 4. Utilisateurs concernés

## Visiteur

Personne non connectée consultant les contenus publics autorisés.

**Statut actuel :** `PARTIEL`

Une page d’accueil visiteur existe déjà.

L’authentification réelle n’existe pas encore.

## Joueur / Membre

Dans RP SF, **Membre et Joueur désignent le même type d’utilisateur**.

Il ne doit pas exister deux rôles techniques distincts uniquement sur cette différence de vocabulaire.

Toute personne peut créer librement un compte.

Lors de son inscription, elle peut créer son premier personnage.

Un joueur peut posséder plusieurs personnages selon les règles prévues par le système Personnage.

**Statut actuel :** `PRÉVU / PARTIEL`

Les interfaces et données de personnages existent déjà en partie, mais les comptes utilisateurs réels ne sont pas encore implémentés.

## Capitaine / membre d’équipage

Ces termes décrivent des **rôles de jeu contextuels** et non des catégories de comptes distinctes.

Certaines actions peuvent dépendre du rôle occupé au sein d’un équipage.

**Statut actuel :** `PARTIEL`

Une partie de cette logique est déjà représentée dans l’interface Vaisseau.

## MJ

Utilisateur disposant de permissions supplémentaires afin de gérer ou arbitrer le jeu.

Il doit disposer d’outils adaptés pour intervenir sur les systèmes nécessitant une validation ou une modification humaine.

**Statut actuel :** `PARTIEL / PRÉVU`

Plusieurs éléments d’administration ou modes MJ existent, mais aucun système d’administration complet n’est encore disponible.

## Administrateur

Utilisateur disposant des droits techniques ou fonctionnels nécessaires à l’administration générale de la plateforme.

MJ et Administrateur sont deux rôles distincts.

Le MJ agit sur le domaine RP / jeu.

L’Administrateur agit sur la plateforme, les comptes, rôles, permissions, paramètres globaux, sécurité et aspects techniques.

**Statut actuel :** `PRÉVU`

L’authentification et les permissions réelles devront être développées avant qu’un véritable rôle administrateur puisse être sécurisé.

---

# 5. Objectifs principaux

- [x] Centraliser les principaux outils nécessaires au RP.
- [x] Disposer d’une navigation structurée entre les différentes zones de l’application.
- [x] Permettre la consultation des joueurs et personnages.
- [x] Fournir une carte galactique interactive.
- [x] Structurer le lore.
- [~] Permettre la gestion complète des personnages.
- [~] Permettre la gestion complète des dynasties.
- [~] Permettre la gestion complète des vaisseaux.
- [~] Intégrer le RP écrit directement dans la plateforme.
- [~] Intégrer les missions.
- [~] Intégrer les combats spatiaux.
- [ ] Mettre en place une véritable persistance des données.
- [ ] Mettre en place les comptes utilisateurs.
- [ ] Mettre en place les permissions réelles.
- [ ] Fournir les outils MJ nécessaires à l’exploitation réelle du jeu.
- [ ] Permettre au projet de fonctionner sans dépendre de données de démonstration codées directement dans l’application.

---

# 6. Objectifs secondaires

- [~] Réduire les calculs manuels.
- [~] Centraliser les informations de localisation.
- [~] Assurer la cohérence entre personnage, dynastie, vaisseau et RP.
- [ ] Faciliter la gestion du temps de jeu.
- [ ] Faciliter le suivi économique.
- [ ] Faciliter la gestion des récompenses.
- [ ] Faciliter la gestion des découvertes et de la progression du monde.
- [ ] Fournir des outils d’administration suffisamment accessibles pour éviter les modifications de code lors des opérations courantes.
- [ ] Améliorer progressivement l’accessibilité.
- [ ] Maintenir une bonne expérience sur différentes tailles d’écran.

---

# 7. Indicateurs généraux de réussite

Le projet pourra être considéré comme ayant atteint son objectif fonctionnel global lorsque :

- [ ] n’importe quel nouveau joueur peut créer librement un compte ;
- [ ] une adresse e-mail obligatoire est correctement gérée ;
- [ ] un nouveau joueur peut créer son premier personnage ;
- [ ] les règles de limitation du nombre de personnages sont appliquées correctement ;
- [ ] ses permissions sont appliquées correctement ;
- [ ] les données importantes sont persistantes ;
- [ ] un joueur peut consulter et utiliser ses personnages ;
- [ ] les RP peuvent être créés, consultés et conservés ;
- [ ] les personnages restent liés correctement à leurs informations associées ;
- [ ] les joueurs peuvent gérer leurs propres avatars dans les limites prévues ;
- [ ] les vaisseaux et équipages disposent de leur fonctionnement principal ;
- [ ] les systèmes de progression nécessaires au jeu sont fonctionnels ;
- [ ] les MJ peuvent effectuer les principales opérations de gestion sans modifier le code ;
- [ ] les règles importantes disposent de leur documentation ;
- [ ] les parcours critiques sont testés ;
- [ ] la sécurité est adaptée aux données réellement manipulées ;
- [ ] le projet peut être sauvegardé et restauré ;
- [ ] les données de démonstration peuvent être distinguées des données réelles.

Ces critères décrivent la cible globale du projet et non un objectif immédiat de la branche actuelle.

---

# 8. Périmètre fonctionnel — Accueil et navigation

**Statut :** `EXISTANT / PARTIEL`

## But

Permettre au visiteur ou joueur d’entrer dans la plateforme et d’accéder facilement aux principales sections.

## Inclus

- [x] Accueil visiteur.
- [x] Pont / interface joueur.
- [x] Navigation principale.
- [x] Accès au Lore.
- [x] Accès aux Membres.
- [x] Accès au Compte.
- [x] Accès aux Évènements.
- [x] Navigation par routes.
- [x] Boutons précédent / suivant du navigateur.
- [x] Liens directs vers plusieurs pages.
- [x] Compatibilité du routing avec GitHub Pages.
- [ ] Navigation adaptée aux futurs rôles authentifiés.

## Critères d’acceptation

- [x] Une page importante possède une URL identifiable.
- [x] Précédent / suivant fonctionne pour les routes principales.
- [x] Un lien direct ne ramène pas systématiquement à l’accueil.
- [ ] Les menus futurs tiennent compte des permissions réelles.

---

# 9. Périmètre fonctionnel — Carte galactique

**Statut :** `EXISTANT / PARTIEL`

## But

Permettre d’explorer visuellement le monde du jeu et d’accéder aux informations géographiques pertinentes.

## Inclus

- [x] Vue galaxie.
- [x] Secteurs.
- [x] Systèmes.
- [x] Planètes.
- [x] Autres objets spatiaux.
- [x] Zones.
- [x] Lieux.
- [x] Routes.
- [x] États de découverte.
- [x] Informations variables selon les chapitres lorsque prévues.
- [x] Mode joueur.
- [x] Éléments de mode administration.
- [~] Liaison entre localisation et RP.
- [~] Liaison entre localisation et vaisseau.
- [ ] Outils complets d’administration de la carte.

## Limites actuelles

Les données sont principalement définies dans les fichiers du projet.

Le système ne possède pas encore d’interface d’administration complète permettant de modifier l’univers sans changer le code.

---

# 10. Périmètre fonctionnel — Joueurs / Membres

**Statut :** `PARTIEL`

## But

Permettre la consultation et la recherche des joueurs et personnages liés à la communauté.

## Inclus

- [x] Liste de membres.
- [x] Distinction PJ / PNJ lorsque pertinente.
- [x] Recherche.
- [x] Filtres.
- [x] Tri.
- [x] Fiches ou panneaux d’information.
- [x] Informations de localisation et d’activité lorsque disponibles.
- [~] Importance Lore pour les PNJ.
- [ ] Connexion aux véritables comptes utilisateurs.
- [ ] Données persistantes administrables.

## Filtres prévus / existants

Le système doit pouvoir couvrir les critères déjà définis pour le projet, notamment :

- dynastie ;
- personnage ;
- statut ;
- âge ;
- sexe ;
- faction ;
- système ;
- monde ;
- équipage ;
- rang social ;
- réputation ;
- PJ / PNJ ;
- présence ou absence de RP actif.

Les détails fonctionnels seront documentés dans le module correspondant.

---

# 11. Périmètre fonctionnel — Personnages

**Statut :** `PARTIEL AVANCÉ`

## But

Centraliser les informations nécessaires à la consultation et à la gestion d’un personnage.

## Inclus

- [x] Fiche personnage.
- [x] Identité.
- [x] Faction.
- [x] Dynastie.
- [x] Informations physiques et biographiques.
- [x] Compétences / informations de progression affichables.
- [x] Relation avec le vaisseau.
- [x] Avatars.
- [x] Grands Avatars.
- [x] Jusqu’à deux Grands Avatars dans le prototype actuel.
- [x] Conservation du choix du Grand Avatar dans les messages RP du prototype.
- [~] Modification du personnage.
- [~] Inventaire.
- [ ] Persistance réelle des modifications.
- [ ] Permissions réelles permettant de déterminer qui peut modifier quoi.
- [ ] Création complète de personnage depuis l’application.

## Création et nombre de personnages

Toute personne nouvellement inscrite peut créer son premier personnage.

Un joueur peut posséder plusieurs personnages.

### Jusqu’à 3 personnages vivants

Un joueur peut disposer de **jusqu’à trois personnages vivants** sans demande exceptionnelle supplémentaire.

### Au-delà de 3 personnages vivants

La création d’un nouveau personnage alors que le joueur possède déjà **trois personnages vivants** nécessite :

- une demande explicite ;
- une justification ;
- une validation selon le processus qui sera défini dans le système Personnage / Administration.

Le seuil concerne les **personnages vivants**.

Un personnage mort ne doit donc pas automatiquement continuer à occuper une place dans cette limite.

Les détails concernant :

- personnages morts ;
- personnages retirés ;
- personnages archivés ;
- exceptions ;
- validation ;

seront documentés dans le module Personnages.

## Limites actuelles

Les personnages utilisés dans le prototype sont définis dans des données TypeScript de démonstration.

Le système n’est pas encore relié à une base persistante.

---

# 12. Périmètre fonctionnel — Avatars de personnages

**Statut :** `PARTIEL / PRÉVU`

## Principe

Les joueurs sont responsables de la gestion des avatars de leurs propres personnages.

Le système doit permettre à un joueur autorisé d’ajouter, modifier ou retirer les images associées à son personnage dans les limites prévues.

## Grands Avatars

Maximum :

**2 Grands Avatars par personnage.**

Ils sont notamment utilisés pour les messages RP et les représentations principales du personnage.

Le choix du Grand Avatar utilisé dans un message RP doit être conservé avec le message afin qu’une modification ultérieure du personnage ne change pas rétroactivement l’apparence voulue du post.

## Petits Avatars

Maximum :

**20 petits avatars par personnage.**

Ils sont destinés notamment aux représentations de dialogue ou autres usages prévus par le système RP.

## Gestion

À terme, le joueur doit pouvoir gérer lui-même :

- [ ] ajout ;
- [ ] aperçu ;
- [ ] remplacement ;
- [ ] suppression ;
- [ ] choix lors des usages compatibles.

## Sécurité et stockage

L’upload utilisateur n’existe pas encore techniquement.

Avant son implémentation devront être définis :

- formats autorisés ;
- taille maximale par fichier ;
- dimensions ;
- compression / optimisation ;
- stockage ;
- noms de fichiers sûrs ;
- permissions ;
- suppression ;
- quotas ;
- traitement des métadonnées éventuelles ;
- stratégie de sauvegarde.

Ces règles seront détaillées dans `SECURITY.md` et la documentation Personnages / Médias.

---

# 13. Périmètre fonctionnel — Dynasties

**Statut :** `PARTIEL / PROTOTYPE`

## But

Gérer la dimension familiale et dynastique indépendante des personnages.

## Inclus

- [x] Page Dynastie.
- [x] Navigation depuis un personnage.
- [x] Structure de généalogie.
- [x] Représentation des avantages dynastiques.
- [~] Progression dynastique.
- [ ] Création réelle de membres dynastiques.
- [ ] Création réelle de PJ depuis la dynastie.
- [ ] Création réelle de PNJ depuis la dynastie.
- [ ] Persistance.
- [ ] Administration complète.

Les boutons actuellement présents pour ajouter des PJ ou PNJ sont explicitement des placeholders de prototype.

Toute création de PJ depuis une dynastie devra également respecter les règles globales de limitation du nombre de personnages du joueur.

---

# 14. Périmètre fonctionnel — Vaisseaux

**Statut :** `PARTIEL`

## But

Permettre la consultation et la gestion des vaisseaux, de leurs caractéristiques, de leur localisation et de leurs équipements.

## Inclus

- [x] Panneau Vaisseau.
- [x] Informations principales.
- [x] Équipage.
- [x] Capitaine.
- [x] Localisation.
- [x] Distinction de rôles.
- [x] Caractéristiques techniques.
- [x] Équipements.
- [x] Propulseurs.
- [x] Page de configuration.
- [~] Permissions différenciées capitaine / membre d’équipage.
- [~] Modification des configurations.
- [ ] Inventaire complet du vaisseau.
- [ ] Contrats d’équipage complets.
- [ ] Persistance réelle.
- [ ] Administration réelle.

## Limites actuelles

Les changements sont principalement gérés dans l’état du frontend.

Ils ne constituent pas encore une gestion persistante de production.

---

# 15. Périmètre fonctionnel — RP écrit

**Statut :** `PARTIEL / PROTOTYPE FONCTIONNEL`

## But

Permettre la consultation et à terme la création complète de RP directement dans la plateforme.

## Inclus

- [x] Fils de RP de démonstration.
- [x] Affichage des messages.
- [x] Personnages auteurs.
- [x] Avatars.
- [x] Sélection de Grand Avatar.
- [x] Formats RP de base.
- [x] Accès à la localisation.
- [x] Modes d’accès de RP représentés dans les données.
- [x] Intégration avec les combats.
- [~] Publication locale dans le prototype.
- [ ] Création persistante d’un RP.
- [ ] Édition persistante.
- [ ] Suppression persistante.
- [ ] Historique réel.
- [ ] Permissions réelles.
- [ ] Gestion complète des invitations.
- [ ] Stockage côté serveur.

## Limites actuelles

Les messages actuels sont principalement des données de prototype et/ou de l’état React.

Un rafraîchissement n’équivaut pas encore à un véritable stockage de forum.

---

# 16. Périmètre fonctionnel — Combat spatial

**Statut :** `PROTOTYPE`

## But

Permettre de gérer les combats spatiaux comme une extension mécanique des RP.

## Inclus

- [x] Interface de combat.
- [x] Prototype de tours.
- [x] Équipages.
- [x] Actions.
- [x] États des systèmes.
- [x] Ready.
- [x] Ciblage.
- [x] Effets de combat représentés.
- [x] Fil RP associé.
- [x] Comportement de reddition représenté.
- [~] Règles mécaniques principales.
- [ ] Moteur complet validé.
- [ ] Persistance.
- [ ] Synchronisation multi-utilisateurs.
- [ ] Résolution serveur.
- [ ] Sécurité contre la modification client des actions.
- [ ] Gestion complète des permissions et postes.

Les règles détaillées seront documentées dans un fichier dédié.

---

# 17. Périmètre fonctionnel — Missions

**Statut :** `PARTIEL / PROTOTYPE`

## But

Permettre aux joueurs de consulter, accepter et accomplir des missions intégrées au déroulement RP.

## Inclus

- [x] Tableau / données de missions.
- [x] Sélection.
- [x] Acceptation de mission dans le prototype.
- [x] État de mission active.
- [~] Intégration aux RP.
- [ ] Journal complet.
- [ ] Objectifs persistants.
- [ ] Validation MJ complète.
- [ ] Attribution persistante des récompenses.
- [ ] Répartition réelle des gains.
- [ ] Historique des missions.

---

# 18. Périmètre fonctionnel — Lore

**Statut :** `PARTIEL AVANCÉ`

## But

Centraliser les informations canoniques accessibles aux joueurs.

## Sections principales

- [x] Histoire Galactique.
- [x] Archives.
- [x] Factions.
- [x] Espèces.
- [x] Faune.
- [x] Religions.
- [~] Découvertes & Technologies.

## Inclus

- [x] Navigation interne.
- [x] Fiches.
- [x] Chronologie.
- [x] Catégories.
- [x] Illustrations.
- [x] Archives.
- [x] Navigation par routes pour plusieurs sections.
- [~] Visibilité évolutive selon l’état du monde.
- [~] Outils d’administration préparatoires.
- [ ] Administration complète des contenus.
- [ ] Permissions / connaissances RP réellement appliquées côté serveur.

Le contenu canonique détaillé sera documenté séparément.

---

# 19. Périmètre fonctionnel — Évènements

**Statut :** `PROTOTYPE / INTERFACE`

## But

Afficher les événements actifs du jeu et permettre à terme leur gestion.

## Actuellement

- [x] Page dédiée.
- [x] État vide lorsqu’aucun événement n’existe.
- [ ] Données d’évènements réelles.
- [ ] Dates.
- [ ] Événements actifs / terminés.
- [ ] Gestion MJ.
- [ ] Liens vers les RP ou systèmes concernés.
- [ ] Historique éventuel.

---

# 20. Périmètre fonctionnel — Compte

**Statut :** `PROTOTYPE / INTERFACE`

## But

Centraliser les informations liées au compte et aux systèmes d’activité.

## Actuellement

- [x] Page Compte.
- [x] Représentation du cycle de 7 bonus de connexion sur 11 jours.
- [x] Représentation du bonus du premier RP quotidien.
- [ ] Valeurs définitives des récompenses.
- [ ] Compte utilisateur réel.
- [ ] Authentification.
- [ ] Historique d’activité réel.
- [ ] Persistance.
- [ ] Préférences utilisateur.
- [ ] Gestion des personnages associés au compte.
- [ ] Gestion des demandes de personnage supplémentaire.

Aucune récompense non encore décidée ne doit être inventée.

---

# 21. Périmètre fonctionnel — Authentification et inscription

**Statut :** `PRÉVU`

## Principe d’inscription

L’inscription est **ouverte**.

N’importe quelle personne peut créer un compte sans invitation préalable ni validation manuelle du compte.

Une **adresse e-mail est obligatoire** à l’inscription.

La création du compte doit permettre d’accéder à la création du premier personnage.

La validation éventuelle d’éléments liés au personnage ne doit pas être confondue avec une validation préalable du compte.

## Inclus à terme

- [ ] Création de compte libre.
- [ ] Adresse e-mail obligatoire.
- [ ] Connexion.
- [ ] Déconnexion.
- [ ] Gestion sécurisée des sessions.
- [ ] Récupération d’accès.
- [ ] Permissions.
- [ ] Association compte ↔ profil joueur.
- [ ] Association compte ↔ personnages.
- [ ] Création du premier personnage.
- [ ] Gestion du nombre de personnages vivants.
- [ ] Demande motivée lorsqu’un joueur souhaite dépasser trois personnages vivants.

## Actuellement

Les boutons **Se connecter** et **S’inscrire** sont des placeholders.

Aucune authentification réelle n’est actuellement présente dans le dépôt.

La solution technique n’est pas encore définie.

---

# 22. Périmètre fonctionnel — Administration / MJ

**Statut :** `PARTIEL / PRÉVU`

## Principe de séparation

MJ et Administrateur sont deux rôles distincts.

### MJ

Le MJ agit sur le **domaine RP et jeu**.

Son périmètre exact sera précisé dans la documentation des permissions.

### Administrateur

L’Administrateur agit sur le **domaine plateforme et technique**.

Il dispose des droits globaux nécessaires sur les comptes, rôles, permissions, paramètres, sécurité et autres éléments techniques.

Une permission MJ ne doit jamais donner implicitement des droits Administrateur.

## Éléments déjà présents ou préparés

- [x] Mode administrateur de carte.
- [x] Éléments / placeholders d’administration du Lore.
- [x] Modifications locales de certains états.
- [~] Contrôle du temps.
- [~] Outils de gestion ponctuels.

## Cible MJ

- [ ] Administration des personnages dans le cadre RP.
- [ ] Gestion RP des vaisseaux.
- [ ] Administration des dynasties lorsque pertinent.
- [ ] Administration de la carte.
- [ ] Administration du lore.
- [ ] Gestion des événements.
- [ ] Gestion des missions.
- [ ] Validation des récompenses.
- [ ] Gestion économique pertinente.
- [ ] Traitement des demandes de personnages supplémentaires.

## Cible Administrateur

- [ ] Gestion des comptes.
- [ ] Gestion des rôles.
- [ ] Gestion des permissions.
- [ ] Paramètres de plateforme.
- [ ] Administration technique.
- [ ] Sécurité.
- [ ] Services techniques.
- [ ] Journalisation des opérations sensibles lorsque nécessaire.

---

# 23. Périmètre fonctionnel — Temps de jeu

**Statut :** `PARTIEL`

Le projet possède un temps RP distinct du temps réel.

L’avancement du temps est contrôlé par le MJ.

Le prototype contient déjà un état Année / Mois et une fonction permettant de passer au mois suivant.

Le système définitif devra gérer les conséquences nécessaires sur les autres mécaniques.

Les règles détaillées seront documentées séparément.

---

# 24. Périmètre fonctionnel — Économie

**Statut :** `PRÉVU / CONCEPTION`

L’économie appartient au projet.

Elle pourra notamment interagir avec :

- factions ;
- missions ;
- personnages ;
- vaisseaux ;
- dettes ;
- événements ;
- récompenses ;
- décisions MJ.

L’intégralité de l’économie n’a pas vocation à être simulée algorithmiquement.

Les règles détaillées seront déplacées vers une documentation spécialisée avant implémentation importante.

---

# 25. Périmètre fonctionnel — Progression et compétences

**Statut :** `PRÉVU / PARTIEL SELON LES INTERFACES`

Le système de progression appartient au projet.

Il doit pouvoir prendre en compte :

- compétences individuelles ;
- spécialisation ;
- surspécialisation ;
- progression ;
- faction ;
- âge / formation lorsque pertinent ;
- avantages dynastiques.

Les règles détaillées ne doivent pas être maintenues dans `SCOPE.md`.

---

# 26. Périmètre fonctionnel — Voyages

**Statut :** `PARTIEL / CONCEPTION`

Le projet doit permettre de représenter :

- localisation ;
- déplacements ;
- secteurs ;
- systèmes ;
- mondes ;
- lieux ;
- vaisseaux ;
- routes ;
- technologies de déplacement.

La carte possède déjà une grande partie de la base nécessaire.

La logique complète de déplacement n’est pas encore considérée comme terminée.

---

# 27. Périmètre fonctionnel — Découvertes et technologies

**Statut :** `PARTIEL / PRÉVU`

La section existe dans le Lore et certaines données sont déjà représentées.

La cible comprend notamment :

- technologies connues ;
- découvertes ;
- ressources ;
- évolution liée au déroulement du jeu ;
- visibilité selon progression / chapitre lorsque nécessaire.

Les règles de déblocage et d’administration restent à définir précisément.

---

# 28. Périmètre fonctionnel — Explicitement exclu du périmètre actuel

Les éléments suivants ne font pas partie du périmètre actuel et ne doivent pas être développés sans nouvelle décision explicite :

- [EXCLU] E-commerce.
- [EXCLU] Paiement réel intégré.
- [EXCLU] Abonnement payant intégré.
- [EXCLU] Marketplace.
- [EXCLU] Publicité.
- [EXCLU] Facturation.
- [EXCLU] Réservation commerciale.
- [EXCLU] Application mobile native.
- [EXCLU] Messagerie SMS.
- [EXCLU] Appels audio / vidéo.
- [EXCLU] Intégration d’IA générative directement dans le gameplay.
- [EXCLU] Automatisation complète des décisions normalement réservées aux MJ.
- [EXCLU] Simulation économique exhaustive et autonome du monde.
- [EXCLU] Inscription uniquement sur invitation.
- [EXCLU] Validation manuelle obligatoire d’un compte avant son utilisation normale.

Une exclusion actuelle n’interdit pas une évolution future explicitement validée.

---

# 29. Évolutions futures identifiées

Ces éléments peuvent appartenir à la cible finale mais ne doivent pas être considérés comme implémentés ou immédiatement à développer.

- [ ] Véritable backend.
- [ ] Base de données persistante.
- [ ] Authentification.
- [ ] Rôles et permissions.
- [ ] Administration graphique complète.
- [ ] Persistance des RP.
- [ ] Persistance des personnages.
- [ ] Persistance des vaisseaux.
- [ ] Persistance des missions.
- [ ] Persistance du temps de jeu.
- [ ] Gestion serveur du combat.
- [ ] Outils de modération.
- [ ] Historique / audit des opérations importantes.
- [ ] Sauvegardes de données.
- [ ] Exports lorsque nécessaires.
- [ ] Stockage des avatars utilisateurs.
- [ ] Notifications éventuelles si leur utilité est confirmée.

---

# 30. Rôles et permissions — cible générale

> Cette matrice constitue une orientation générale.
> Les permissions exactes devront faire l’objet d’une documentation spécialisée avant mise en production.

| Rôle | Consultation publique | Compte personnel | Créer du RP | Gérer ses personnages | Gérer ses avatars | Gestion vaisseau | Administration |
|---|---|---|---|---|---|---|---|
| Visiteur | Oui, selon contenu | Non | Non | Non | Non | Non | Non |
| Joueur / Membre | Oui | Oui | Oui, selon personnage | Oui, selon règles | Oui | Selon rôle d’équipage | Non |
| Capitaine | Oui | Oui | Oui | Oui | Oui | Oui, selon droits | Non |
| MJ | Oui | Oui | Oui | Selon droits MJ | Selon droits MJ | Oui | Domaine RP / jeu |
| Administrateur | Oui | Oui | Selon besoin | Oui | Selon besoin | Oui | Plateforme / technique |

`Capitaine` reste un rôle contextuel du jeu et non nécessairement un rôle global d’autorisation du compte.

Aucune de ces permissions ne doit être considérée comme sécurisée tant que l’authentification et les contrôles serveur n’existent pas.

---

# 31. Données manipulées

## Données du jeu actuellement présentes

- [x] Joueurs / membres de démonstration.
- [x] Personnages.
- [x] Dynasties.
- [x] Vaisseaux.
- [x] Équipements.
- [x] Compétences / caractéristiques.
- [x] RP.
- [x] Messages RP.
- [x] Missions.
- [x] Chapitres.
- [x] Secteurs.
- [x] Systèmes.
- [x] Planètes.
- [x] Objets spatiaux.
- [x] Zones.
- [x] Lieux.
- [x] Routes.
- [x] Données de lore.
- [x] Factions.
- [x] Espèces.
- [x] Religions.
- [x] Découvertes / ressources.
- [x] États de combat.

## Données personnelles

### Actuellement

Le prototype ne possède pas encore de véritables comptes utilisateurs persistants.

Les données actuellement présentes sont principalement des données de jeu et de démonstration.

### À terme

La présence de comptes impliquera des données liées aux utilisateurs.

Une adresse e-mail sera obligatoire à l’inscription.

Les autres données exactes à collecter devront être définies avant la création du backend.

- **Présentes actuellement :** limitées / prototype
- **Présentes à terme :** Oui
- **Adresse e-mail :** Oui, obligatoire
- **Autres types futurs exacts :** À définir
- **Données sensibles :** aucune collecte sensible prévue par défaut

Ne pas ajouter une donnée personnelle simplement parce qu’elle pourrait être utile.

---

# 32. Fichiers et médias

## Actuellement

Le projet contient des assets statiques versionnés ou placés dans les ressources du site :

- illustrations ;
- avatars ;
- cartes ;
- vaisseaux ;
- éléments de lore.

## Upload par les joueurs

**Statut : `PRÉVU`**

Les joueurs devront pouvoir gérer directement les avatars de leurs propres personnages.

### Limites fonctionnelles validées

Par personnage :

- **2 Grands Avatars maximum** ;
- **20 petits avatars maximum**.

Le système devra empêcher le dépassement de ces limites.

### Fonctions prévues

- [ ] Upload.
- [ ] Prévisualisation.
- [ ] Remplacement.
- [ ] Suppression.
- [ ] Contrôle des permissions.
- [ ] Limitation du nombre d’images.
- [ ] Optimisation des images.
- [ ] Nettoyage du stockage lors d’une suppression définitive lorsque nécessaire.

### Paramètres techniques restant à définir

- formats autorisés ;
- poids maximal ;
- dimensions minimales / maximales ;
- compression ;
- recadrage éventuel ;
- stockage ;
- durée de conservation ;
- traitement des métadonnées.

Les mesures de sécurité associées devront être détaillées dans `SECURITY.md`.

---

# 33. Interfaces et écrans

Les principales interfaces existantes ou appartenant au projet comprennent :

- [x] Accueil visiteur.
- [x] Pont joueur.
- [x] Carte galactique.
- [x] Carte secteur.
- [x] Carte système.
- [x] Astres.
- [x] Zones.
- [x] Lieux.
- [x] Membres / joueurs.
- [x] Fiche personnage.
- [x] Dynastie.
- [x] Vaisseau.
- [x] Configuration vaisseau.
- [x] RP.
- [x] Combat.
- [x] Lore.
- [x] Évènements.
- [x] Compte.
- [~] Missions.
- [~] Administration.
- [ ] Connexion.
- [ ] Inscription.
- [ ] Création de personnage.
- [ ] Gestion des avatars.
- [ ] Demande de personnage supplémentaire.
- [ ] Administration complète.

---

# 34. Règles métier

Les règles métier complexes seront déplacées vers leur documentation respective.

`SCOPE.md` conserve uniquement les principes généraux suivants :

- le RP reste central ;
- le temps réel et le temps RP sont distincts ;
- le MJ contrôle l’avancement temporel ;
- certaines actions nécessitent validation MJ ;
- Membre et Joueur représentent le même type d’utilisateur ;
- l’inscription est libre ;
- une adresse e-mail est obligatoire à l’inscription ;
- un nouveau joueur peut créer son premier personnage ;
- jusqu’à trois personnages vivants peuvent être possédés sans demande exceptionnelle ;
- au-delà de trois personnages vivants, une demande explicite et justifiée est nécessaire ;
- les joueurs gèrent leurs propres avatars ;
- un personnage peut posséder au maximum deux Grands Avatars et vingt petits avatars ;
- MJ et Administrateur sont deux rôles distincts ;
- les personnages, vaisseaux, dynasties et RP sont des objets liés mais distincts ;
- les identifiants stables doivent être privilégiés pour les relations ;
- les connaissances du joueur peuvent dépendre de l’état du monde ;
- les décisions RP ne doivent pas toutes être automatisées ;
- les règles mécaniques importantes doivent être documentées avant leur généralisation.

---

# 35. Documentation spécialisée associée

Documents prévus ou susceptibles d’être nécessaires :

- [ ] `DESIGN_RULES.md`
- [ ] `MEMBERS.md`
- [ ] `CHARACTERS.md`
- [ ] `DYNASTIES.md`
- [ ] `SKILLS.md`
- [ ] `TIME_AND_RP.md`
- [ ] `RP_SYSTEM.md`
- [ ] `SHIPS.md`
- [ ] `SPACE_TRAVEL.md`
- [ ] `SPACE_COMBAT.md`
- [ ] `ECONOMY.md`
- [ ] `MISSIONS.md`
- [ ] `WORLD_MAP.md`
- [ ] `LORE.md`
- [ ] `PERMISSIONS.md`
- [ ] autres documents selon besoin

La liste n’impose pas leur création immédiate.

---

# 36. Contraintes techniques

## Technologies actuelles

- **Frontend :** React
- **Langage :** TypeScript
- **Build :** Vite
- **Modules :** ES Modules
- **Routing :** routeur interne basé sur History API
- **Backend :** N/A actuellement
- **Base de données :** N/A actuellement
- **Stockage dynamique :** N/A actuellement
- **Hébergement :** GitHub Pages
- **CI / déploiement :** GitHub Actions
- **E-mail :** N/A actuellement
- **API externe :** aucune dépendance importante identifiée actuellement

---

# 37. Contraintes d’hébergement actuelles

Le site est actuellement hébergé sous un sous-chemin GitHub Pages.

Le projet doit donc respecter :

- `BASE_URL` Vite ;
- chemin `/GaiaRP/` en production actuelle ;
- liens compatibles avec ce sous-répertoire ;
- assets résolus correctement ;
- gestion particulière des routes SPA sur GitHub Pages.

Une future architecture backend pourra nécessiter un changement d’hébergement.

Ce changement n’est pas inclus automatiquement.

---

# 38. Responsive

- [x] Responsive pris en compte dans plusieurs interfaces.
- [~] Responsive global à poursuivre.
- [ ] Audit complet mobile.
- [ ] Audit tablette.
- [ ] Audit des systèmes complexes tels que carte et combat.

La priorité actuelle reste une expérience desktop robuste, sans rendre volontairement les autres formats inutilisables.

---

# 39. Navigateurs ciblés

Cible générale :

- navigateurs desktop modernes ;
- Chromium récent ;
- Firefox récent ;
- Safari moderne lorsque la plateforme approchera d’une utilisation publique réelle ;
- navigateurs mobiles modernes lorsque les interfaces concernées seront finalisées.

La matrice exacte devra être fixée avant une version de production réelle.

---

# 40. Dépendances externes principales

| Service / dépendance | Usage | Obligatoire actuellement | Propriétaire | Coût actuel estimé | Risque principal |
|---|---|---:|---|---:|---|
| GitHub | Dépôt du projet | Oui | Propriétaire du projet | Gratuit selon offre | Dépendance à la plateforme |
| GitHub Actions | Build / déploiement | Oui actuellement | Propriétaire du projet | Gratuit dans les limites du forfait | Quotas / évolution du service |
| GitHub Pages | Hébergement prototype | Oui actuellement | Propriétaire du projet | Gratuit | Limité à un hébergement statique |
| npm | Dépendances frontend | Oui | N/A | Gratuit | Supply chain |
| React | Interface | Oui | N/A | Gratuit | Maintenance / évolutions |
| TypeScript | Développement | Oui | N/A | Gratuit | Compatibilité versions |
| Vite | Build | Oui | N/A | Gratuit | Compatibilité versions |

Les futurs services de backend, base de données, authentification ou stockage ne sont pas encore sélectionnés.

---

# 41. Contenus du projet

## Produits dans le cadre du projet

- [x] Code.
- [x] Interfaces.
- [x] Données de démonstration.
- [x] Règles de jeu.
- [x] Lore.
- [x] Illustrations.
- [x] Cartographie.
- [x] Documentation.

## Origine des contenus

Les contenus peuvent provenir :

- du propriétaire du projet ;
- des joueurs pour les contenus qu’ils sont autorisés à gérer ;
- de créations réalisées spécialement pour le projet ;
- d’outils de génération autorisés ;
- de ressources tierces lorsque leurs droits le permettent.

Les joueurs seront notamment responsables des avatars qu’ils téléversent pour leurs propres personnages.

Les conditions d’utilisation devront préciser la responsabilité concernant les droits sur les médias fournis lorsque le projet approchera d’une ouverture réelle.

---

# 42. Exigences non fonctionnelles

## Performance

Le site doit rester fluide sur un matériel grand public raisonnable.

Une attention particulière doit être portée :

- aux images ;
- aux avatars ;
- aux grandes cartes ;
- aux listes importantes ;
- aux composants lourds ;
- aux recalculs inutiles.

Les futurs avatars téléversés devront être optimisés afin d’éviter qu’un grand nombre d’images non maîtrisées dégrade inutilement les performances et les coûts de stockage.

## Disponibilité

Le prototype actuel dépend de GitHub Pages.

Aucun SLA particulier n’est prévu.

Une éventuelle cible de disponibilité devra être définie si la plateforme devient réellement utilisée comme service permanent.

## Volumes

Les volumes définitifs ne sont pas encore connus.

À terme, il faut anticiper notamment :

- plusieurs joueurs ;
- plusieurs personnages par joueur ;
- jusqu’à 22 avatars par personnage dans la configuration maximale actuelle ;
- nombreux RP ;
- nombreux messages ;
- contenu de lore croissant ;
- nombreuses images ;
- nombreux objets du monde.

La future base doit être conçue pour un projet communautaire raisonnable, sans surarchitecture destinée à des millions d’utilisateurs.

## Maintenabilité

Priorités :

- modularité ;
- lisibilité ;
- TypeScript ;
- données séparées autant que possible de l’interface ;
- documentation ;
- limitation des dépendances ;
- réduction progressive des composants devenant trop importants.

---

# 43. Sauvegardes

## Actuellement

Le code et les contenus statiques sont versionnés dans Git.

Cela constitue un historique du code, **pas un véritable système de sauvegarde des futures données utilisateurs**.

## À terme

Avant toute utilisation avec données persistantes, définir :

- stratégie de sauvegarde ;
- fréquence ;
- rétention ;
- restauration ;
- responsabilité ;
- tests de restauration ;
- couverture des médias utilisateurs.

Voir `SECURITY.md`.

---

# 44. Sécurité et confidentialité

## État actuel

- **Niveau de risque actuel estimé :** Faible à modéré.
- **Authentification réelle :** Non.
- **Base distante :** Non.
- **Données persistantes utilisateur :** Non.
- **API privée :** Non.
- **Paiement :** Non.
- **Uploads utilisateur :** Non actuellement, mais prévus.
- **Administration sécurisée :** Non — prototype uniquement.

Le niveau de risque augmentera fortement lors de l’introduction :

- des comptes ;
- de la persistance ;
- des uploads d’avatars ;
- des outils d’administration.

Voir `SECURITY.md` pour les décisions détaillées.

---

# 45. Aspects légaux et conformité

Le projet est actuellement personnel et en développement.

Avant une ouverture réelle avec comptes et données utilisateurs, vérifier selon l’architecture retenue :

- [ ] Mentions légales.
- [ ] Politique de confidentialité.
- [ ] RGPD.
- [ ] Information sur les traitements.
- [ ] Conservation des données.
- [ ] Suppression des comptes / données.
- [ ] Cookies et stockage local.
- [ ] Sous-traitants.
- [ ] Droits des contenus.
- [ ] Règles applicables aux avatars téléversés.
- [ ] Accessibilité.
- [ ] Conditions d’utilisation.

- [N/A] CGV — aucun service commercial vendu actuellement.
- [N/A] Paiement / remboursement — aucun paiement réel prévu actuellement.

---

# 46. Livrables actuels

Le projet doit conserver :

- [x] Dépôt Git.
- [x] Code source.
- [x] Site construisible.
- [x] Déploiement GitHub Pages.
- [x] README.
- [x] Changelog.
- [x] Documentation générale.
- [ ] Documentation spécialisée complète.

## N/A actuellement

- [N/A] Formation client.
- [N/A] Transfert client.
- [N/A] Livraison contractuelle.
- [N/A] Comptes techniques client.

---

# 47. Tests attendus

## Dès maintenant

- [x] Build Vite.
- [ ] Typecheck lorsque pertinent.
- [ ] Tests fonctionnels manuels.
- [ ] Routing.
- [ ] Refresh des routes.
- [ ] Précédent / suivant.
- [ ] Liens directs.
- [ ] GitHub Pages.
- [ ] Responsive.
- [ ] Régression des modules modifiés.

## À introduire progressivement

- [ ] Tests automatisés de logique critique.
- [ ] Tests de permissions.
- [ ] Tests backend.
- [ ] Tests de données.
- [ ] Tests de sécurité.
- [ ] Tests des quotas de personnages.
- [ ] Tests des limites 2 / 20 avatars.
- [ ] Tests d’upload de fichiers.
- [ ] Tests de sauvegarde / restauration.
- [ ] Tests multi-utilisateurs lorsque nécessaires.

---

# 48. Environnements

## Développement

Vite local.

## Préproduction

`N/A actuellement`

Aucun environnement de staging distinct n’est identifié.

Son intérêt devra être réévalué lors de l’arrivée d’un véritable backend ou d’utilisateurs réels.

## Production / démonstration publique actuelle

GitHub Pages.

La version déployée ne doit pas être confondue avec une plateforme de production complète tant que les systèmes critiques restent des prototypes.

---

# 49. Garantie, maintenance et support

Projet personnel.

- **Garantie corrective :** N/A
- **Contrat de maintenance :** N/A
- **Support client :** N/A

La maintenance technique reste à la charge du propriétaire du projet.

Les dépendances et l’infrastructure doivent néanmoins rester suivies.

---

# 50. Hypothèses du projet

- [x] La branche `main` de GitHub reste la référence technique courante.
- [x] Le projet continue d’être développé progressivement.
- [x] Les mécaniques peuvent être documentées et finalisées module par module.
- [x] Le RP reste prioritaire sur l’automatisation.
- [x] Toutes les décisions MJ n’ont pas besoin d’être automatisées.
- [x] L’inscription finale est ouverte à tous.
- [x] Une adresse e-mail est obligatoire à l’inscription.
- [x] Un nouveau joueur peut créer son premier personnage.
- [x] Joueur et Membre ne constituent pas deux rôles distincts.
- [x] Un joueur peut posséder jusqu’à trois personnages vivants sans demande exceptionnelle.
- [x] Dépasser trois personnages vivants nécessite une demande explicite et justifiée.
- [x] Les joueurs gèrent leurs propres avatars.
- [x] Chaque personnage peut posséder au maximum deux Grands Avatars.
- [x] Chaque personnage peut posséder au maximum vingt petits avatars.
- [x] MJ et Administrateur sont deux rôles distincts.
- [x] Les données actuelles de démonstration seront progressivement remplacées ou migrées lorsque la persistance sera introduite.
- [x] Le projet vise une communauté RP de taille raisonnable et non une plateforme grand public massive.
- [x] L’architecture doit rester évolutive sans être surdimensionnée.
- [ ] La future architecture backend reste à déterminer.
- [ ] La future méthode d’authentification reste à déterminer.
- [ ] La future stratégie de stockage des médias reste à déterminer.

---

# 51. Risques connus

| Risque | Probabilité | Impact | Prévention / réponse |
|---|---|---|---|
| Confondre prototype et fonctionnalité terminée | Élevée | Moyen | Statuts explicites dans la documentation |
| Documentation dépassée par le code | Moyenne | Élevé | GitHub comme référence technique + mise à jour des `.md` |
| Accumulation de logique dans `App.tsx` | Moyenne | Moyen/Élevé | Découpage progressif lorsque justifié |
| Accumulation du CSS global | Moyenne | Moyen | Structuration progressive sans refonte arbitraire |
| Ajout prématuré d’un backend mal adapté | Moyenne | Élevé | Cadrer les besoins avant choix technique |
| Mauvaise migration des données de prototype | Moyenne | Élevé | Préparer un véritable modèle de données |
| Permissions insuffisamment définies | Moyenne | Élevé | `PERMISSIONS.md` avant backend réel |
| Abus de création de comptes | Moyenne | Moyen | Protections anti-abus adaptées |
| Contournement de la limite de personnages | Moyenne | Moyen | Contrôle côté serveur |
| Abus ou stockage excessif d’avatars | Moyenne | Moyen/Élevé | Quotas, optimisation et limites serveur |
| Upload de fichier malveillant | Moyenne lorsque uploads actifs | Élevé | Validation et stockage sécurisés |
| Scope creep lié au nombre de systèmes | Élevée | Moyen | Modules documentés et priorisés |
| Régression lors d’une modification d’un système central | Moyenne | Élevé | Tester les systèmes dépendants |
| Dépendance excessive à une conversation passée | Élevée sans documentation | Élevé | Documentation spécialisée durable |
| Secrets ou données privées ajoutés par erreur lors du backend | Faible actuellement | Critique | `SECURITY.md`, `.env`, revue avant production |

---

# 52. Dépendances / prérequis bloquants

## Pour continuer le prototype frontend actuel

- [x] Aucun prérequis externe critique supplémentaire.

## Avant de transformer le prototype en véritable plateforme persistante

Il faudra impérativement définir :

- [ ] architecture backend ;
- [ ] base de données ;
- [ ] modèle de données ;
- [ ] authentification ;
- [ ] rôles ;
- [ ] permissions ;
- [ ] politique de sécurité ;
- [ ] stratégie de sauvegarde ;
- [ ] gestion et stockage des avatars ;
- [ ] formats et limites des uploads ;
- [ ] données personnelles réellement nécessaires ;
- [ ] stratégie de migration des données de démonstration.

Ces points ne bloquent pas le travail de conception ou les améliorations frontend actuelles.

---

# 53. Gestion des demandes hors périmètre

Toute nouvelle fonctionnalité ou évolution importante doit être classée comme :

### `INCLUS`

Elle appartient déjà au système prévu et ne modifie pas sensiblement son périmètre.

### `AJUSTEMENT`

Elle améliore ou corrige le comportement attendu sans créer un nouveau système important.

### `NOUVEAU MODULE`

Elle introduit un système fonctionnel distinct.

### `FUTUR`

Elle est pertinente mais ne doit pas être développée maintenant.

### `EXCLU`

Elle ne correspond pas au périmètre actuel.

### `À ÉVALUER`

Son impact n’est pas encore suffisamment compris.

Une suggestion de l’assistant n’est jamais automatiquement classée `INCLUS`.

---

# 54. Journal des changements de périmètre

| Date | Demande / décision | Classification | Impact | Décision |
|---|---|---|---|---|
| 2026-09-23 | Restructuration complète de la documentation | AJUSTEMENT STRUCTUREL | Documentation | Validé |
| 2026-09-23 | GitHub `main` devient explicitement la référence technique permanente | RÈGLE PROJET | Évite les retours vers anciennes dev | Validé |
| 2026-09-23 | Inscription ouverte à tous | RÈGLE COMPTE | Authentification / sécurité | Validé |
| 2026-09-23 | Adresse e-mail obligatoire | RÈGLE COMPTE | Authentification / récupération | Validé |
| 2026-09-23 | Membre et Joueur représentent le même utilisateur | RÈGLE COMPTE | Simplification des rôles | Validé |
| 2026-09-23 | Premier personnage accessible à l’inscription | RÈGLE PERSONNAGE | Parcours d’inscription | Validé |
| 2026-09-23 | Demande justifiée obligatoire au-delà de trois personnages vivants | RÈGLE PERSONNAGE | Permissions / administration | Validé |
| 2026-09-23 | Gestion des avatars par les joueurs | RÈGLE MÉDIA | Stockage / sécurité | Validé |
| 2026-09-23 | Limite de 2 Grands Avatars et 20 petits avatars par personnage | RÈGLE MÉDIA | Quotas / stockage | Validé |
| 2026-09-23 | MJ et Administrateur sont deux rôles distincts | RÈGLE PERMISSIONS | Séparation RP / plateforme | Validé |

---

# 55. Conditions de validation d’un module

Un module important n’est considéré comme fonctionnel que lorsque :

- [ ] le comportement attendu est défini ;
- [ ] la fonctionnalité principale existe ;
- [ ] les principaux cas d’erreur sont gérés ;
- [ ] les permissions sont définies lorsque nécessaires ;
- [ ] les données sont réellement conservées lorsque la persistance est nécessaire ;
- [ ] les interactions avec les autres systèmes sont vérifiées ;
- [ ] les tests nécessaires sont réalisés ;
- [ ] sa documentation est à jour ;
- [ ] aucun placeholder critique n’est présenté comme une fonction réelle.

Une belle interface seule ne suffit pas.

---

# 56. Conditions de fin globale du projet

RP SF est un projet évolutif et n’a actuellement pas de date de clôture prévue.

Une version pouvant être considérée comme une véritable plateforme exploitable devra néanmoins remplir au minimum les conditions suivantes :

- [ ] inscription ouverte fonctionnelle ;
- [ ] adresse e-mail obligatoire correctement gérée ;
- [ ] comptes utilisateurs opérationnels ;
- [ ] création du premier personnage opérationnelle ;
- [ ] règles de nombre de personnages appliquées ;
- [ ] gestion des avatars opérationnelle ;
- [ ] données persistantes ;
- [ ] permissions sécurisées ;
- [ ] séparation MJ / Administrateur opérationnelle ;
- [ ] principaux parcours joueur fonctionnels ;
- [ ] principaux parcours MJ fonctionnels ;
- [ ] RP persistants ;
- [ ] systèmes indispensables au jeu finalisés ;
- [ ] sauvegardes ;
- [ ] restauration ;
- [ ] documentation ;
- [ ] sécurité adaptée ;
- [ ] conformité applicable ;
- [ ] absence de bug bloquant connu ;
- [ ] tests des parcours critiques ;
- [ ] séparation claire entre données de test et données réelles.

---

# 57. Validation du périmètre

## Projet personnel

- [x] Le présent document constitue la base de cadrage du projet.
- [x] Les fonctionnalités existantes ont été distinguées des prototypes et fonctionnalités futures.
- [x] Le principe d’inscription a été défini.
- [x] L’adresse e-mail obligatoire a été définie.
- [x] Les règles générales de nombre de personnages ont été définies.
- [x] La responsabilité de gestion des avatars a été définie.
- [x] Les limites principales d’avatars ont été définies.
- [x] La séparation MJ / Administrateur a été définie.
- [ ] Les éléments restant `À CONFIRMER` doivent être traités lorsqu’ils deviennent nécessaires.
- **Date :** 2026-09-23

---

# 58. Points restant à confirmer

Ces décisions ne bloquent pas la restructuration documentaire actuelle.

## 58.1 Personnages supplémentaires

La règle générale est définie :

- jusqu’à trois personnages vivants sans demande exceptionnelle ;
- demande explicite et justifiée au-delà.

Le module Personnages devra préciser ultérieurement :

- à qui la demande est adressée ;
- les informations demandées ;
- qui peut l’accepter ;
- les critères éventuels ;
- le comportement lorsqu’un personnage meurt ;
- le comportement lorsqu’un personnage est abandonné ou archivé ;
- la possibilité ou non de refuser une demande.

## 58.2 Avatars

Les quotas sont définis :

- 2 Grands Avatars ;
- 20 petits avatars.

Restent à définir lors du travail sur le système :

- formats acceptés ;
- dimensions ;
- poids maximal ;
- recadrage éventuel ;
- optimisation automatique ;
- possibilité de réordonner les avatars ;
- remplacement d’une image déjà utilisée dans un ancien RP ;
- suppression d’une image déjà référencée par un ancien message.

Ce dernier point sera particulièrement important afin de préserver l’apparence historique des anciens RP.

## 58.3 Compte et authentification

Décisions validées :

- inscription ouverte ;
- adresse e-mail obligatoire.

Restent à définir :

- identifiant de connexion principal ;
- vérification obligatoire ou non de l’adresse e-mail avant certaines actions ;
- mécanisme de récupération du compte ;
- règles de changement d’adresse e-mail.

## 58.4 Rôles

Décisions validées :

- MJ et Administrateur sont distincts ;
- MJ agit sur le domaine RP / jeu ;
- Administrateur agit sur la plateforme et la technique.

Le détail des permissions sera défini dans `PERMISSIONS.md`.

## 58.5 Architecture persistante

Le choix :

- backend ;
- base de données ;
- authentification ;
- stockage des médias ;

sera effectué plus tard, une fois les besoins suffisamment documentés.

Aucune technologie ne doit être choisie uniquement pour « commencer le backend » sans avoir d’abord défini ces besoins.
