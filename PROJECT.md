# Instructions de lecture

Ce document constitue la **référence de conception du projet RP SF**. Il est principalement destiné à l'IA assistant au développement et doit être consulté avant toute modification importante du projet.

Les règles et décisions présentes dans ce document doivent être considérées comme **validées**, sauf indication contraire explicite de l'utilisateur.

Lors d'une intervention sur le projet :

* Ne pas contredire ou remplacer silencieusement une règle définie dans ce document.
* Si une demande semble entrer en contradiction avec une règle existante, signaler la contradiction avant de modifier le comportement concerné.
* Une demande ciblée ne constitue pas une autorisation à modifier, simplifier ou refondre les systèmes adjacents.
* Conserver les fonctionnalités et comportements existants qui ne sont pas explicitement concernés par la demande.
* Ne pas considérer le code existant comme plus fiable que ce document concernant le fonctionnement attendu du projet.
* Ne pas considérer une fonctionnalité indiquée comme **prévue**, **future**, **à développer** ou **en réflexion** comme une autorisation à l'implémenter.
* Ne pas inventer une règle manquante. Si une décision de conception est nécessaire et qu'elle n'est définie ni dans ce document ni par l'utilisateur, demander ou proposer des possibilités avant de l'intégrer.
* Lorsqu'une nouvelle décision importante est validée pendant le développement, déterminer si elle doit être ajoutée à ce document afin de conserver une référence à jour.
* Privilégier une modification minimale et maîtrisée lorsqu'elle permet de répondre au besoin sans dégrader l'architecture.
* Avant une refonte importante, expliquer pourquoi elle est nécessaire et identifier les conséquences probables sur les systèmes existants.
* **Ne jamais lancer une génération, création ou modification de fichier, de code, de contenu, d'image ou de tout autre élément si cela n'a pas été explicitement demandé par l'utilisateur.** Une discussion, une analyse, une suggestion ou une validation de principe ne constitue pas une demande d'exécution.

Ce document décrit **ce que le projet doit être**. Le code décrit uniquement **l'état actuel de son implémentation**.

En cas d'écart entre les deux, ne pas corriger automatiquement l'un ou l'autre : identifier l'écart et déterminer avec l'utilisateur quelle version correspond au comportement réellement souhaité.

# RP SF - Cadre du projet

## 1. Présentation du projet

RP SF est une application web destinée à servir de support à un jeu de rôle écrit de science-fiction.

Le site ne remplace pas le RP écrit. Il fournit les systèmes nécessaires à son fonctionnement : personnages, membres, dynasties, vaisseaux, économie, progression, voyages, missions, lore et outils de gestion pour les MJ.

Le projet est conçu progressivement. Les fonctionnalités doivent pouvoir évoluer sans nécessiter de reconstruire les systèmes déjà fonctionnels.

---

# 2. Principes généraux

## 2.1 Priorité au RP

Les mécaniques du site servent le RP et non l'inverse.

Une mécanique ne doit pas être automatisée simplement parce qu'elle peut l'être. Certaines décisions restent volontairement sous le contrôle du MJ lorsqu'une interprétation RP est nécessaire.

L'automatisation doit principalement servir à :

* réduire les tâches répétitives ;
* éviter les erreurs de calcul ;
* conserver un état cohérent du monde ;
* faciliter la consultation des informations ;
* appliquer automatiquement les conséquences déjà validées.

## 2.2 Contrôle du MJ

Le MJ conserve le contrôle des éléments structurants du monde.

Il peut notamment :

* faire avancer le temps ;
* valider certaines actions ;
* valider les missions ;
* déclencher ou gérer des événements ;
* intervenir dans les systèmes économiques ;
* gérer les conséquences RP qui ne sont pas codées en dur.

Le site doit faciliter ces interventions plutôt que chercher à les remplacer.

## 2.3 Ne pas coder inutilement les règles RP

Certaines règles existent uniquement comme cadre RP.

Exemple : l'économie d'une faction peut évoluer à la suite d'événements, de missions ou de décisions des joueurs, mais toutes ces variations n'ont pas besoin d'être calculées automatiquement par un algorithme complexe.

Il faut distinguer :

* les règles nécessitant une mécanique informatique ;
* les règles servant uniquement de cadre aux joueurs et MJ.

---

# 3. Temps et chronologie

Le temps du jeu avance **mois par mois**.

Le passage au mois suivant est décidé par le MJ.

Un RP est identifié selon la structure :

**Chapitre - Année - Mois**

Le temps réel et le temps RP sont indépendants.

Plusieurs RP peuvent avoir lieu durant une même période de jeu.

Des mini-RP peuvent également avoir lieu entre les tours ou dans certains contextes particuliers, notamment à bord d'un vaisseau ou pendant une action collective.

---

# 4. Membres et personnages

## 4.1 Membres

Un membre peut posséder plusieurs personnages.

La page Membres doit permettre de consulter et filtrer les personnages et joueurs selon différents critères.

Filtres prévus ou existants :

* dynastie ;
* personnage ;
* statut ;
* âge ;
* sexe ;
* faction ;
* système ;
* monde ;
* équipage ;
* rang social ;
* réputation ;
* PJ / PNJ ;
* présence ou absence de RP actif.

Le système doit également permettre le tri des résultats.

Une fiche détaillée permet de consulter les informations pertinentes d'un membre.

## 4.2 PJ et PNJ

Le système distingue les personnages joueurs et les personnages non-joueurs.

Cette distinction doit rester disponible dans les interfaces où elle est pertinente.

Certains panneaux, notamment ceux liés aux vaisseaux, doivent permettre de basculer facilement entre PJ et PNJ.

---

# 5. Âge et formation

Les personnages âgés de **0 à 13 ans** ne gagnent pas de points de compétence.

À partir de **14 ans**, un personnage peut entrer en académie.

Pendant sa formation, ses gains de progression sont réduits de **75 %** jusqu'à l'obtention de son diplôme.

Les personnages mineurs peuvent néanmoins générer des points liés à leur dynastie.

Deux seuils importants existent :

### 18 ans

Le personnage devient juridiquement responsable dans certaines situations, mais reste soumis à certaines limitations.

Avant cet âge, la responsabilité relève notamment des parents ou de l'organisation compétente.

### 21 ans

Le personnage peut notamment obtenir les autorisations nécessaires pour piloter ou posséder certains vaisseaux lorsque les autres conditions sont remplies.

Les règles exactes peuvent varier selon la faction.

---

# 6. Factions

Les factions ne constituent pas uniquement des éléments narratifs.

Elles peuvent posséder leurs propres :

* règles ;
* systèmes économiques ;
* arbres de compétences ;
* technologies ;
* rangs sociaux ;
* systèmes de réputation ;
* restrictions ;
* autorisations ;
* institutions.

## Humanis

Humanis constitue la faction de référence au début du projet.

Son arbre de progression sert d'arbre de référence.

Humanis est une société fortement autoritaire.

Les ordres de mission peuvent être obligatoires.

Certaines activités ou possessions nécessitent des permis dépendant notamment du niveau social.

**Réputation et niveau social sont deux valeurs différentes et ne doivent pas être confondus.**

D'autres factions disposeront à terme de leurs propres systèmes.

---

# 7. Compétences individuelles

Chaque faction possède son propre arbre de progression.

L'arbre de référence initial est celui d'Humanis.

Un personnage choisit une spécialisation principale lors de son inscription afin de représenter son background.

Il peut ensuite progresser dans plusieurs branches et devenir polyvalent.

Il est techniquement possible de progresser fortement dans plusieurs domaines.

Cependant, un personnage ne peut posséder qu'**une seule surspécialisation**.

## Arbre Humanis

### Scientifique

Orientation vers l'exploration, la recherche et les technologies associées.

Surspécialisations :

* Explorateur ;
* Médecin.

### Officiel

Orientation vers les institutions, la négociation, le commerce et le renseignement.

Surspécialisations :

* Marchandeur ;
* Espion.

### Soldat

Orientation militaire et tactique.

Surspécialisations :

* Tireur ;
* Stratège.

### Technicien

Orientation vers les systèmes techniques et les vaisseaux.

Surspécialisations :

* Ingénieur ;
* Pilote.

---

# 8. Dynasties

Les dynasties constituent un système distinct des personnages individuels.

Elles possèdent leur propre progression et leurs propres avantages.

Certains avantages dynastiques peuvent être utilisés un nombre limité de fois par tour.

Les valeurs de référence actuellement envisagées sont :

* niveau faible : 0,3 utilisation/tour ;
* niveau intermédiaire : 0,6 utilisation/tour ;
* niveau élevé : 1 utilisation/tour.

Le panneau Dynastie doit rester indépendant du panneau Personnage tout en permettant de naviguer facilement entre les deux.

---

# 9. Économie

Chaque faction peut disposer de sa propre économie.

Les prix ne sont pas nécessairement universels.

Ils peuvent évoluer selon :

* l'état économique de la faction ;
* les événements ;
* les missions ;
* les décisions majeures ;
* les actions des joueurs ;
* les interventions du MJ.

Les fluctuations économiques restent principalement un outil RP et ne doivent pas nécessairement être simulées intégralement.

Des événements importants peuvent provoquer des périodes de :

* croissance ;
* crise ;
* pénurie ;
* faillite ;
* boom économique.

## Dette

La dette ne produit pas automatiquement d'intérêts.

Les conséquences dépendent notamment :

* du montant ;
* de la durée ;
* du contexte.

Des saisies peuvent avoir lieu lorsque la situation le justifie.

## Missions et récompenses

Le fonctionnement général d'une mission est :

**Sélection de la mission → RP lié → Demande de validation → Vérification MJ → Validation → Attribution des gains**

Les gains ne sont donc pas accordés automatiquement simplement parce qu'une condition technique a été remplie.

Après validation par le MJ, le site peut appliquer automatiquement les récompenses.

Lorsqu'une mission implique plusieurs PJ, la récompense est répartie selon un système de **parts** défini dans le contrat établi avec le capitaine.

---

# 10. Vaisseaux

Les vaisseaux possèdent leur propre panneau de consultation et de gestion.

Une page distincte est prévue pour leur modification.

Le système doit distinguer notamment :

* exploration ;
* combat ;
* taille ;
* Tier ;
* équipage ;
* capitaine ;
* localisation ;
* état ;
* systèmes embarqués.

## Classification

### Petits vaisseaux

* Corvette ;
* Frégate.

### Vaisseaux moyens

* Destroyer ;
* Croiseur léger ;
* Croiseur ;
* autres classes selon évolution du système.

Chaque classe peut exister du **Tier I au Tier V** lorsque cela est applicable.

## Exploration et combat

Les variantes de combat disposent généralement d'une capacité d'accueil de PJ inférieure aux variantes d'exploration de taille comparable.

Cela ne signifie pas qu'elles nécessitent moins de spécialistes.

Les armes, systèmes offensifs, blindages et structures renforcées occupent davantage de volume interne, ce qui réduit l'espace disponible pour les quartiers d'équipage et les installations habitables.

---

# 11. Déplacements spatiaux

Le capitaine sélectionne la destination selon une hiérarchie :

**Secteur → Système → Destination**

La localisation du vaisseau doit être clairement enregistrée.

Les états tels que **Amarré** et **En orbite** doivent être gérés explicitement lorsque nécessaire.

## Technologies de saut

Plusieurs systèmes de déplacement interstellaire existent ou sont prévus.

### Stations Imperium

Moyen de transport très sûr.

Contraintes principales :

* coûteux ;
* infrastructure extrêmement longue à installer ;
* infrastructure fixe ;
* nécessite une phase de calcul pendant laquelle le vaisseau reste immobile.

### Trou de Ver

Permet de rejoindre des destinations extrêmement éloignées.

Il nécessite une longue préparation.

Il ne constitue pas un moyen viable de fuite immédiate pendant un combat.

### Générateur de faille

Déplacement extrêmement rapide.

Le passage comporte une faible probabilité de destruction.

L'utilisation du système peut provoquer l'apparition de failles dimensionnelles dans des endroits imprévisibles de l'univers.

## Propulseurs conventionnels

Plusieurs familles de propulseurs doivent proposer de véritables compromis.

Les premières technologies Humanis comprennent notamment :

* Plasma ;
* Ionique ;
* troisième technologie à déterminer.

Les propulseurs peuvent différer selon :

* vitesse ;
* consommation énergétique ;
* discrétion ;
* autres propriétés techniques.

Il ne doit pas exister une technologie systématiquement meilleure dans tous les domaines.

---

# 12. Combat spatial

Les combats spatiaux fonctionnent par **tours simultanés**.

Les joueurs choisissent leurs actions avant la résolution du tour.

Lorsque les participants nécessaires sont prêts, le serveur résout les actions.

Un système de **Ready Check** permet de déterminer lorsque les joueurs concernés ont terminé leurs choix.

Le capitaine ou le MJ peut gérer un poste lorsqu'un participant est absent ou inactif.

## Postes

Les actions disponibles dépendent du poste occupé.

Exemples :

* tir ;
* esquive ;
* réparation ;
* renforcement ;
* gestion des systèmes ;
* autres actions spécialisées.

## Ciblage

À chaque tour, le capitaine définit la cible principale.

Lorsqu'un bouclier adverse est actif, une attaque normale touche d'abord le bouclier, même lorsqu'un système interne particulier est ciblé.

Certaines armes peuvent cependant :

* ignorer le bouclier ;
* ignorer le blindage ;
* ignorer les deux ;
* appliquer des effets temporaires.

Exemple d'effet temporaire :

**Réduction de Vitesse pendant X tours.**

Les statistiques nécessaires à la prise de décision doivent être visibles lorsque le gameplay exige que les joueurs puissent les connaître.

---

# 13. Lore

Le Lore constitue une section structurée du site.

Les catégories principales sont :

## Histoire Galactique

Organisation par chapitres.

Un seul chapitre peut être développé ou ouvert initialement selon l'avancement du jeu.

## Factions

Chaque faction dispose de sa propre fiche.

## Espèces

Catégories prévues :

* espèces conscientes ;
* faune terrestre ;
* faune spatiale.

## Religions

Catégories prévues :

* Foi organisée ;
* Cultes ;
* Rumeurs ;
* Mythes ;
* Légendes.

## Découvertes & Technologies

Section destinée aux technologies et découvertes connues ou débloquées au cours du jeu.

Les informations disponibles doivent pouvoir dépendre de l'état du monde et de la progression du RP.

---

# 14. Architecture de l'application

L'application doit être organisée en modules clairement séparés.

Principales sections :

* Accueil ;
* Membres ;
* Personnages ;
* Dynasties ;
* Vaisseaux ;
* Lore ;
* Missions ;
* systèmes liés au gameplay ;
* administration / MJ.

Une fonctionnalité ne doit pas être placée dans un fichier sans rapport simplement parce que ce fichier existe déjà.

À mesure que le projet grandit, les responsabilités doivent être séparées.

---

# 15. Routing

Les pages principales doivent progressivement disposer de véritables routes.

Exemples de structure cible :

```text
/
├── /membres
├── /membres/:id
├── /personnages/:id
├── /dynasties/:id
├── /vaisseaux/:id
├── /lore
│   ├── /histoire
│   ├── /factions
│   ├── /especes
│   ├── /religions
│   └── /technologies
└── /admin
```

Le routing doit permettre :

* d'utiliser les boutons précédent/suivant du navigateur ;
* de rafraîchir une page sans perdre la destination actuelle ;
* de partager un lien vers une page ou une fiche ;
* d'éviter de gérer toute la navigation uniquement par affichage/masquage de blocs HTML.

Le système de routing doit rester proportionné à l'architecture technique réelle du projet.

Ne pas introduire un framework lourd uniquement pour obtenir du routing si une solution légère suffit.

---

# 16. Règles d'architecture

## Séparation des responsabilités

Dans la mesure du possible, séparer :

**Données → Logique → Interface**

Une donnée ne doit pas être dupliquée dans plusieurs endroits simplement pour faciliter son affichage.

Une modification d'une donnée centrale doit être répercutée partout où elle est utilisée.

## Source unique

Lorsqu'une information possède un identifiant unique, cet identifiant doit servir de référence.

Éviter de créer plusieurs copies indépendantes du même personnage, vaisseau, faction, membre ou autre objet.

## Identifiants

Les objets persistants importants doivent posséder un identifiant stable.

Les relations entre objets doivent utiliser ces identifiants plutôt que leur nom affiché lorsque cela est possible.

Un changement de nom ne doit pas casser les relations existantes.

## Compatibilité

Lors d'une modification :

* ne pas supprimer silencieusement une fonctionnalité existante ;
* préserver les données existantes lorsque cela est raisonnablement possible ;
* identifier les éventuelles migrations nécessaires ;
* vérifier les systèmes dépendants avant de modifier une structure centrale.

## Pas de duplication fonctionnelle

Avant d'ajouter une nouvelle fonction, vérifier qu'une fonction équivalente n'existe pas déjà.

Préférer réutiliser ou généraliser une fonction existante plutôt que créer plusieurs implémentations du même comportement.

## Modularité

Une fonctionnalité importante doit pouvoir évoluer sans nécessiter la modification de toute l'application.

Les systèmes fortement liés peuvent communiquer, mais leurs responsabilités doivent rester identifiables.

---

# 17. Interface utilisateur

L'interface doit rester compréhensible sans nécessiter de connaître le fonctionnement interne du site.

Les informations techniques utiles au développement ne doivent pas apparaître à l'utilisateur sauf lorsqu'elles possèdent également une utilité de gameplay.

Les interfaces similaires doivent conserver des comportements similaires.

Exemples :

* mêmes conventions pour les boutons Retour ;
* mêmes comportements pour les sélecteurs ;
* mêmes conventions pour les fiches ;
* mêmes représentations pour les états ;
* navigation cohérente entre Personnage, Dynastie, Vaisseau et Membre.

Les états importants peuvent utiliser des indicateurs visuels.

Pour les valeurs possédant des seuils :

* état normal ;
* avertissement jaune ;
* danger rouge.

La couleur ne doit pas être le seul moyen de transmettre une information importante lorsque cela peut poser un problème de compréhension.

---

# 18. Permissions et visibilité

Toutes les informations ne sont pas nécessairement accessibles à tous les utilisateurs.

Le système doit pouvoir distinguer au minimum :

* visiteur ;
* membre connecté ;
* joueur concerné ;
* MJ / administration.

À terme, certaines informations pourront également dépendre :

* de la faction ;
* du personnage ;
* des découvertes ;
* du rang ;
* des connaissances RP ;
* des permissions spécifiques.

Une information cachée ne doit pas simplement être masquée visuellement si elle est réellement confidentielle. Elle ne doit pas être envoyée au client lorsque l'architecture permettra de l'éviter.

---

# 19. États du projet

Les fonctionnalités peuvent avoir plusieurs niveaux de maturité.

Une fonctionnalité incomplète ne doit pas être présentée comme terminée uniquement parce qu'une interface existe.

Lors du développement, distinguer autant que possible :

* fonctionnel ;
* partiellement fonctionnel ;
* interface uniquement ;
* prévu ;
* abandonné.

Une idée prévue pour le futur ne doit pas être implémentée implicitement lors d'une modification sans validation préalable.

---

# 20. Règles de modification du projet

Avant une modification importante :

1. identifier les fichiers concernés ;
2. identifier les systèmes dépendants ;
3. conserver les comportements existants qui ne sont pas explicitement modifiés ;
4. effectuer la modification ;
5. tester le comportement modifié ;
6. vérifier les principales régressions potentielles.

Une demande ciblée ne constitue pas une autorisation à refondre les systèmes adjacents.

Si une refonte semble préférable, elle doit être proposée séparément.

---

# 21. Versions

Le projet utilise des versions de développement et des versions stables.

Une version stable correspond à une base considérée comme suffisamment fiable pour être conservée comme référence.

Les versions de développement servent à tester les nouvelles fonctionnalités avant intégration.

Une version invalidée ne doit pas être réutilisée comme nouvelle base simplement parce que son numéro est plus élevé.

La dernière version fonctionnelle validée prime sur la version portant le numéro le plus récent.

Le changelog doit décrire les modifications réellement effectuées.

---

# 22. Philosophie de développement

Le projet est développé progressivement.

Les priorités sont :

1. fonctionnement correct ;
2. conservation des fonctionnalités existantes ;
3. clarté pour l'utilisateur ;
4. maintenabilité ;
5. extensibilité ;
6. optimisation lorsque celle-ci devient nécessaire.

Éviter la sur-ingénierie.

Une architecture plus complexe n'est souhaitable que lorsqu'elle résout un problème réel ou prépare une évolution déjà identifiée.

Les systèmes doivent rester suffisamment flexibles pour accueillir de nouvelles factions, espèces, technologies, vaisseaux et mécaniques sans devoir reconstruire les fondations du projet.

---

# 23. Roadmap fonctionnelle actuelle

État approximatif des principaux systèmes :

* Squelette général : avancé ;
* Page Membres : fonctionnelle / en développement ;
* Panneau Personnage : largement avancé ;
* Panneau Vaisseau : en développement ;
* Dynasties : premières fondations ;
* Lore : structure principale créée ;
* Histoire Galactique : commencée ;
* Factions : structure créée ;
* Espèces : structure créée ;
* Religions : structure créée ;
* Découvertes & Technologies : à développer ;
* Économie : conception en cours ;
* Missions : conception / intégration progressive ;
* Voyages : conception en cours ;
* Combat spatial : règles principales en cours de définition ;
* Administration MJ : développement progressif ;
* Routing : à mettre en place.

---

# 24. Règle fondamentale

**Ne jamais considérer le code actuel comme la définition du fonctionnement voulu.**

Le code représente l'état actuel de l'implémentation.

Ce document représente les décisions de conception validées.

Lorsqu'une contradiction apparaît entre une ancienne implémentation et une règle explicitement définie dans ce document, la règle du projet doit servir de référence, après vérification qu'elle est toujours d'actualité.
