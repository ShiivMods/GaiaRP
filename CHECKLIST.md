# CHECKLIST.md — RP SF / Gaïa RP

**Projet :** RP SF / Gaïa RP  
**Type :** Projet personnel — plateforme web communautaire de jeu de rôle écrit  
**Dépôt de référence :** `ShiivMods/GaiaRP`  
**Branche de référence :** `main`  
**Création de cette checklist :** 23 septembre 2026  
**Dernière mise à jour :** 23 septembre 2026  

> Cette checklist constitue le tableau de pilotage global du projet.
>
> Elle ne remplace pas `PROJECT.md`, `SCOPE.md`, `SECURITY.md` ni les documentations spécialisées.
>
> L’état technique doit toujours être vérifié sur la branche `main` de GitHub.
>
> Une fonctionnalité affichée dans le prototype n’est pas automatiquement considérée comme terminée.

---

# 0. MODE D’EMPLOI ET RÈGLES DE CONTRÔLE

## 0.1 Statuts

- `[ ]` À faire.
- `[x]` Fait et vérifié.
- `[~]` En cours / partiellement traité.
- `[!]` Bloqué / risque / décision importante nécessaire.
- `[N/A]` Non applicable — justification obligatoire.

## 0.2 Règles générales

- [x] Une checklist spécifique existe pour Gaïa RP.
- [x] Le projet et son dépôt de référence sont identifiés.
- [x] `PROJECT.md` existe.
- [x] `SCOPE.md` est restructuré.
- [x] `SECURITY.md` est restructuré.
- [x] Les fonctionnalités futures sont distinguées des fonctionnalités existantes.
- [x] Les prototypes sont distingués des fonctionnalités de production.
- [x] Toute décision importante doit être documentée.
- [x] Toute modification importante du périmètre doit être tracée.
- [x] Aucun secret ne doit être inscrit dans cette checklist.
- [x] Une ancienne version ne doit jamais remplacer arbitrairement `main`.
- [x] Une idée ou suggestion ne constitue pas une autorisation de développement.
- [ ] Toute nouvelle règle durable est reportée dans la documentation appropriée.
- [ ] Les documentations spécialisées sont créées progressivement.
- [ ] Avant chaque étape importante, vérifier que les prérequis associés sont remplis.
- [ ] Aucun système n’est considéré terminé uniquement parce que son interface existe.

## 0.3 Informations projet

| Champ | Valeur |
|---|---|
| Nom | RP SF / Gaïa RP |
| Type | Projet personnel |
| Produit | Plateforme web communautaire / RP |
| Dépôt | `ShiivMods/GaiaRP` |
| Branche de référence | `main` |
| Frontend actuel | React + TypeScript + Vite |
| Routing | Routeur interne / History API |
| Hébergement actuel | GitHub Pages |
| Déploiement | GitHub Actions |
| Backend | À définir |
| Base de données | À définir |
| Authentification | À définir |
| Stockage utilisateurs | À définir |
| Environnement de préproduction | N/A actuellement |
| Responsable projet | Propriétaire de Gaïa RP |
| Administrateur global prévu | Propriétaire du projet |
| MJ | Rôle distinct, périmètre RP |
| Maintenance | Continue, projet personnel |

## 0.4 Principales décisions déjà validées

- [x] GitHub `main` constitue la référence technique permanente.
- [x] Inscription ouverte à tous.
- [x] Adresse e-mail obligatoire à l’inscription.
- [x] Membre et Joueur représentent le même type d’utilisateur.
- [x] Un joueur peut créer son premier personnage après inscription.
- [x] Jusqu’à 3 personnages vivants sans demande exceptionnelle.
- [x] Au-delà de 3 personnages vivants : demande explicite et justifiée.
- [x] Les joueurs gèrent eux-mêmes leurs avatars.
- [x] 2 Grands Avatars maximum par personnage.
- [x] 20 petits avatars maximum par personnage.
- [x] MJ et Administrateur sont deux rôles distincts.
- [x] Le MJ agit dans le domaine RP / jeu.
- [x] L’Administrateur agit sur la plateforme, les comptes, permissions et aspects techniques.
- [x] Les décisions RP ne doivent pas toutes être automatisées.
- [x] Le frontend ne constitue jamais une protection pour une donnée confidentielle.

---

# 1. MATRICE D’APPLICABILITÉ

## 1.1 Nature du produit

- [N/A] Site vitrine — Gaïa RP est principalement une application.
- [N/A] Landing page commerciale.
- [x] Application web.
- [x] Plateforme communautaire.
- [x] Forum / système RP écrit.
- [x] Back-office / administration prévu.
- [x] Cartographie interactive.
- [x] Annuaire / recherche de membres et personnages.
- [x] Gestion de comptes prévue.
- [x] Gestion de contenu utilisateur prévue.
- [~] Outils de gestion internes MJ.
- [N/A] SaaS commercial.
- [N/A] E-commerce.
- [N/A] Marketplace.
- [N/A] Réservation commerciale.
- [N/A] Application mobile native.
- [N/A] API seule.

## 1.2 Fonctions applicables

- [ ] Comptes utilisateurs réels.
- [ ] Authentification.
- [ ] Adresse e-mail obligatoire.
- [ ] Récupération de compte.
- [ ] Plusieurs rôles.
- [ ] Permissions.
- [~] Administration.
- [ ] MFA administrateur.
- [ ] MFA MJ à évaluer.
- [ ] Formulaire privé.
- [ ] Upload d’images.
- [ ] Stockage de médias.
- [x] Recherche.
- [x] Filtres.
- [x] Tris.
- [x] Contenu RP.
- [ ] Modération réelle.
- [ ] Protection anti-abus.
- [~] Temps réel — certains systèmes futurs pourraient l’exiger.
- [ ] Notifications e-mail à évaluer.
- [N/A] SMS.
- [N/A] Paiement.
- [N/A] Facturation.
- [x] Cartographie.
- [~] Historique des modifications à prévoir pour certains systèmes.
- [ ] Journal d’audit des opérations sensibles.
- [ ] Archivage des données lorsque pertinent.
- [ ] Données personnelles.
- [~] Données de mineurs possibles selon les utilisateurs réels : cadre à considérer avant ouverture.
- [N/A] Données de santé.
- [N/A] Données financières réelles.
- [N/A] Géolocalisation réelle des utilisateurs.
- [N/A] Multi-tenant entreprise.
- [ ] Sauvegardes.
- [ ] Restauration.
- [ ] Gestion des incidents.

### PORTE A — Applicabilité

- [x] Les grandes catégories applicables sont identifiées.
- [~] Certaines décisions restent volontairement ouvertes jusqu’au choix du backend.

---

# 2. PHASE COMMERCIALE ET CONTRACTUELLE

Gaïa RP est un projet personnel.

## 2.1 Relation client

- [N/A] Client juridique — aucun client.
- [N/A] Devis.
- [N/A] Acompte.
- [N/A] Facturation.
- [N/A] Échéancier.
- [N/A] Signature contractuelle.
- [N/A] Garantie commerciale.
- [N/A] Maintenance contractuelle.
- [N/A] Livraison à un client.
- [N/A] Transfert de propriété à un client.

## 2.2 Propriété

- [x] Le dépôt appartient au propriétaire du projet.
- [x] Le contrôle administratif GitHub appartient au propriétaire du projet.
- [ ] Vérifier les licences des éventuels futurs contenus tiers.
- [ ] Vérifier les licences des éventuelles nouvelles bibliothèques.
- [ ] Documenter les règles relatives aux contenus fournis par les joueurs.

### PORTE B — Démarrage

- [N/A] Porte commerciale — projet personnel.

---

# 3. CADRAGE DU BESOIN ET SPÉCIFICATIONS MÉTIER

## 3.1 Objectifs

- [x] Problème général identifié.
- [x] Public principal identifié.
- [x] Objectif général défini.
- [x] RP écrit identifié comme cœur du projet.
- [x] Rôle du MJ identifié.
- [x] Automatisation volontairement limitée lorsque le RP doit primer.
- [x] Grandes fonctionnalités identifiées.
- [x] Évolutions futures distinguées de l’existant.
- [~] Priorisation globale des modules à maintenir au fil du développement.

## 3.2 Utilisateurs

- [x] Visiteur identifié.
- [x] Joueur / Membre identifié comme rôle unique.
- [x] MJ identifié.
- [x] Administrateur identifié.
- [x] Capitaine identifié comme rôle contextuel.
- [x] Membre d’équipage identifié comme rôle contextuel.
- [ ] Permissions exactes documentées dans `PERMISSIONS.md`.
- [ ] Parcours d’inscription final documenté.
- [ ] Parcours de récupération de compte documenté.
- [ ] Parcours de suppression de compte documenté.

## 3.3 Parcours principaux à documenter

- [ ] Inscription → création du premier personnage.
- [ ] Connexion → Pont joueur.
- [ ] Création d’un personnage supplémentaire.
- [ ] Demande de 4e personnage vivant.
- [ ] Gestion des avatars.
- [ ] Création d’un RP.
- [ ] Publication d’une réponse.
- [ ] Invitation à un RP privé / restreint.
- [ ] Déplacement / localisation.
- [ ] Acceptation d’une mission.
- [ ] Validation d’une mission par MJ.
- [ ] Combat spatial.
- [ ] Gestion d’un vaisseau.
- [ ] Gestion d’une dynastie.
- [ ] Gestion du temps par MJ.
- [ ] Administration du Lore.
- [ ] Administration de la carte.
- [ ] Suppression / archivage d’un personnage.
- [ ] Mort d’un personnage.
- [ ] Suppression d’un compte.

## 3.4 Règles métier générales

- [x] Maximum de 3 personnages vivants sans autorisation supplémentaire.
- [x] Justification requise au-delà.
- [x] Maximum de 2 Grands Avatars.
- [x] Maximum de 20 petits avatars.
- [x] Le MJ contrôle l’avancement du temps.
- [x] Temps réel et temps RP distincts.
- [x] Certaines récompenses nécessitent validation MJ.
- [x] Capitaine = rôle contextuel, pas rôle global.
- [x] Réputation et niveau social doivent rester distincts.
- [ ] États complets des personnages définis.
- [ ] États complets des RP définis.
- [ ] États complets des missions définis.
- [ ] États complets des vaisseaux définis.
- [ ] États complets des combats définis.
- [ ] Règles de suppression définies.
- [ ] Règles d’archivage définies.
- [ ] Règles de conservation historique définies.

## 3.5 Volumes

- [ ] Nombre approximatif de joueurs actifs estimé avant backend.
- [ ] Nombre approximatif de personnages estimé.
- [ ] Volume annuel de RP estimé.
- [ ] Volume annuel de messages estimé.
- [ ] Volume potentiel d’avatars estimé.
- [ ] Taille maximale des avatars définie.
- [ ] Trafic simultané attendu approximativement estimé.
- [ ] Besoin de temps réel estimé pour le combat.
- [ ] Besoin de stockage à moyen terme estimé.

### PORTE C — Besoin

- [~] Suffisant pour poursuivre le prototype.
- [ ] À compléter avant architecture backend définitive.

---

# 4. DONNÉES, RGPD, CONFIDENTIALITÉ ET CONFORMITÉ

## 4.1 Inventaire des futures données

- [ ] Adresse e-mail.
- [ ] Identifiant / pseudo.
- [ ] Mot de passe ou identité gérée par fournisseur Auth.
- [ ] Profil joueur.
- [ ] Personnages.
- [ ] Avatars.
- [ ] RP.
- [ ] Messages RP.
- [ ] Permissions.
- [ ] Relations équipage.
- [ ] Missions.
- [ ] Progression.
- [ ] Actions administratives pertinentes.
- [ ] Logs techniques.

## 4.2 Minimisation

- [x] Aucun besoin identifié de collecter le nom réel.
- [x] Aucun besoin identifié d’adresse postale.
- [x] Aucun besoin identifié de téléphone.
- [x] Aucun besoin identifié de données de santé.
- [x] Aucun besoin identifié de données financières.
- [ ] Vérifier que l’âge réel des joueurs n’est pas collecté inutilement.
- [ ] Limiter les champs de compte au strict nécessaire.

## 4.3 Confidentialité

- [x] Toute donnée actuellement incluse au frontend est considérée publique.
- [ ] Les futurs RP privés sont filtrés côté serveur.
- [ ] Les informations MJ privées restent côté serveur.
- [ ] Les données administratives restent protégées.
- [ ] Les informations non découvertes destinées à rester secrètes ne sont pas envoyées au client.

## 4.4 Droits utilisateurs

- [ ] Accès aux données personnelles.
- [ ] Rectification.
- [ ] Suppression du compte.
- [ ] Suppression / anonymisation des données selon les règles retenues.
- [ ] Export si applicable.
- [ ] Comportement des anciens RP après suppression d’un compte défini.
- [ ] Comportement des personnages après suppression d’un compte défini.
- [ ] Comportement des avatars après suppression défini.

## 4.5 Durées de conservation

- [ ] Durée de conservation des comptes.
- [ ] Comptes inactifs.
- [ ] RP.
- [ ] Messages.
- [ ] Personnages archivés.
- [ ] Avatars.
- [ ] Logs.
- [ ] Sauvegardes.

## 4.6 Services tiers

- [x] GitHub identifié.
- [x] GitHub Pages identifié.
- [x] GitHub Actions identifié.
- [ ] Backend futur identifié.
- [ ] Base future identifiée.
- [ ] Fournisseur Auth identifié.
- [ ] Stockage médias identifié.
- [ ] Fournisseur e-mail identifié si nécessaire.
- [ ] Localisation des données vérifiée.
- [ ] Conditions de traitement vérifiées.

## 4.7 Cookies / stockage navigateur

- [x] Aucun système applicatif significatif de cookies / localStorage identifié actuellement.
- [ ] Stratégie de session future définie.
- [ ] Cookies futurs inventoriés.
- [ ] Traceurs éventuels inventoriés.
- [ ] Analytics éventuel évalué.

## 4.8 Violation de données

- [x] Procédure générale décrite dans `SECURITY.md`.
- [ ] Procédure opérationnelle adaptée au futur backend.
- [ ] Capacité de révocation des sessions.
- [ ] Capacité de rotation des secrets.
- [ ] Capacité d’identifier les utilisateurs potentiellement concernés.

### PORTE D — Données

- [!] Non franchie pour une ouverture avec comptes réels.
- [x] Sans blocage pour le prototype statique actuel.

---

# 5. ACCESSIBILITÉ, CONTENUS ET EXIGENCES LÉGALES

## 5.1 Accessibilité

- [~] Responsive déjà présent sur plusieurs modules.
- [ ] Navigation clavier auditée.
- [ ] Focus visibles vérifiés.
- [ ] Contrastes vérifiés.
- [ ] Structure des titres vérifiée.
- [ ] Labels de formulaires vérifiés.
- [ ] Alternatives textuelles pertinentes vérifiées.
- [ ] Zoom navigateur testé.
- [ ] Carte utilisable autrement qu’exclusivement par couleur lorsque pertinent.
- [ ] États jaune / rouge accompagnés d’un autre indicateur.
- [ ] Objectif d’accessibilité final défini.

## 5.2 Contenus et propriété intellectuelle

- [ ] Origine des images recensée.
- [ ] Droits des images externes vérifiés.
- [ ] Règles applicables aux avatars joueurs définies.
- [ ] Les joueurs confirment disposer des droits nécessaires sur les médias qu’ils ajoutent.
- [ ] Procédure de retrait d’un média problématique.
- [ ] Licences de polices vérifiées si ajout futur.
- [ ] Licences logicielles vérifiées.

## 5.3 Documents publics futurs

- [ ] Mentions légales.
- [ ] Politique de confidentialité.
- [ ] Conditions d’utilisation si nécessaires.
- [ ] Règles communautaires.
- [ ] Règles relatives aux contenus joueurs.
- [N/A] CGV — aucun commerce prévu.

---

# 6. SPÉCIFICATIONS FONCTIONNELLES DÉTAILLÉES

## 6.1 Modules principaux

### Accueil / navigation

- [x] Accueil visiteur.
- [x] Pont joueur prototype.
- [x] Routing principal.
- [x] Navigation navigateur.
- [x] GitHub Pages compatible.
- [~] Navigation selon permissions futures.

### Carte

- [x] Galaxie.
- [x] Secteurs.
- [x] Systèmes.
- [x] Astres.
- [x] Objets spatiaux.
- [x] Zones.
- [x] Lieux.
- [~] Administration.
- [~] Intégration avec RP.
- [~] Intégration vaisseaux / localisation.

### Joueurs / Membres

- [x] Liste.
- [x] Recherche.
- [x] Filtres.
- [x] Tri.
- [~] Fiches.
- [ ] Liaison comptes réels.

### Personnages

- [x] Fiche.
- [x] Données de démonstration.
- [x] Grands Avatars prototype.
- [~] Édition.
- [~] Inventaire.
- [ ] Création réelle.
- [ ] Persistance.
- [ ] Gestion des 3 personnages vivants.
- [ ] Demandes exceptionnelles.
- [ ] Archivage / décès.

### Avatars

- [x] Deux Grands Avatars représentés dans le prototype.
- [ ] Upload joueur.
- [ ] Limite 2 Grands Avatars.
- [ ] Limite 20 petits avatars.
- [ ] Optimisation.
- [ ] Suppression.
- [ ] Conservation historique des anciens RP à définir.

### Dynasties

- [x] Page.
- [x] Généalogie prototype.
- [x] Avantages représentés.
- [~] Progression.
- [ ] Création réelle des membres.
- [ ] Persistance.

### Vaisseaux

- [x] Panneau.
- [x] Équipage.
- [x] Capitaine.
- [x] Localisation.
- [x] Configuration prototype.
- [~] Équipements.
- [ ] Inventaire complet.
- [ ] Contrats.
- [ ] Persistance.

### RP

- [x] Lecture.
- [x] Messages.
- [x] Mise en forme prototype.
- [x] Grands Avatars.
- [x] Localisation.
- [~] Publication prototype.
- [ ] Création persistante.
- [ ] Édition.
- [ ] Suppression.
- [ ] Invitations.
- [ ] Accès privés.
- [ ] Historique.

### Combat spatial

- [x] Interface prototype.
- [x] Tours représentés.
- [x] Actions.
- [x] Ready.
- [x] États de systèmes.
- [~] Règles.
- [ ] Autorité serveur.
- [ ] Multi-utilisateur.
- [ ] Persistance.
- [ ] Résolution finale validée.

### Missions

- [x] Données prototype.
- [x] Sélection.
- [x] Acceptation prototype.
- [~] Mission active.
- [ ] Objectifs persistants.
- [ ] Validation MJ.
- [ ] Récompenses.
- [ ] Historique.

### Lore

- [x] Histoire.
- [x] Archives.
- [x] Factions.
- [x] Espèces.
- [x] Faune.
- [x] Religions.
- [~] Découvertes & Technologies.
- [~] Administration.
- [ ] Permissions de visibilité serveur.

### Évènements

- [x] Page.
- [x] État vide.
- [ ] Évènements réels.
- [ ] Gestion MJ.
- [ ] Historique.

### Compte

- [x] Interface prototype.
- [x] Bonus connexion représenté.
- [x] Bonus premier RP représenté.
- [ ] Authentification.
- [ ] Profil.
- [ ] Personnages associés.
- [ ] Gestion des avatars.
- [ ] Gestion des demandes exceptionnelles.

---

# 7. CONCEPTION UX / UI

## 7.1 Principes

- [x] Identité science-fiction.
- [x] Interface sombre cohérente.
- [x] Lisibilité prioritaire.
- [x] Taille de police augmentée par rapport aux anciennes versions.
- [x] Conventions générales d’avatars établies.
- [x] Illustrations vaisseaux en 16:9.
- [x] Grands portraits en format portrait fixe.
- [x] Mini-avatars cohérents.
- [x] Lore à paragraphes naturels plutôt qu’excessivement hachés.
- [ ] `DESIGN_RULES.md` créé.
- [ ] Composants récurrents inventoriés.
- [ ] États d’erreur harmonisés.
- [ ] Confirmations d’actions destructrices harmonisées.
- [ ] Responsive complet audité.

## 7.2 Parcours

- [ ] Inscription ergonomique.
- [ ] Création personnage ergonomique.
- [ ] Gestion avatars ergonomique.
- [ ] Création RP ergonomique.
- [ ] Navigation entre personnage / dynastie / vaisseau cohérente.
- [ ] Administration MJ ergonomique.
- [ ] Mobile vérifié sur parcours simples.
- [ ] Systèmes complexes adaptés au mobile au cas par cas.

---

# 8. ARCHITECTURE TECHNIQUE ET INFRASTRUCTURE

## 8.1 Frontend actuel

- [x] React.
- [x] TypeScript.
- [x] TypeScript strict.
- [x] Vite.
- [x] Routing History API.
- [x] Organisation `features/`.
- [x] Données monde sous `world/`.
- [x] Assets compatibles `BASE_URL`.
- [x] GitHub Pages.
- [x] GitHub Actions.

## 8.2 Architecture frontend

- [~] `App.tsx` joue encore un rôle d’orchestration important.
- [ ] Surveiller sa croissance.
- [ ] Découper uniquement lorsqu’un besoin réel apparaît.
- [~] `styles.css` global important.
- [ ] Structurer progressivement si la maintenance devient difficile.
- [x] Éviter la refonte arbitraire uniquement pour « nettoyer ».

## 8.3 Backend futur

- [ ] Besoins exacts finalisés.
- [ ] Technologie backend choisie.
- [ ] Hébergement choisi.
- [ ] Base choisie.
- [ ] Auth choisie.
- [ ] Stockage médias choisi.
- [ ] E-mail choisi si nécessaire.
- [ ] Architecture documentée.
- [ ] Coûts estimés.
- [ ] Limites de quota estimées.
- [ ] Réversibilité évaluée.

## 8.4 Données

- [ ] Modèle utilisateur.
- [ ] Modèle personnage.
- [ ] Modèle avatar.
- [ ] Modèle dynastie.
- [ ] Modèle vaisseau.
- [ ] Modèle équipage.
- [ ] Modèle RP.
- [ ] Modèle message.
- [ ] Modèle mission.
- [ ] Modèle combat.
- [ ] Modèle monde.
- [ ] Modèle permissions.
- [ ] Migrations versionnées.

## 8.5 Environnements

- [x] Développement local.
- [x] Prototype public GitHub Pages.
- [N/A] Préproduction actuellement — aucun backend réel.
- [ ] Reconsidérer staging avant ouverture publique avec données persistantes.
- [ ] Séparer données dev et production.

### PORTE E — Architecture

- [x] Suffisante pour poursuivre le prototype frontend.
- [!] Non franchie pour backend / production communautaire réelle.

---

# 9. SÉCURITÉ — BASELINE MINIMALE

Référence principale : `SECURITY.md`.

## 9.1 Dépôt / secrets

- [x] Aucun secret applicatif requis actuellement.
- [ ] Ajouter `.env*` pertinent à `.gitignore` avant premier secret.
- [ ] Aucun secret dans le frontend.
- [ ] Aucun secret dans Git.
- [ ] `.env.example` sans secret si nécessaire.
- [ ] Rotation des secrets documentée.

## 9.2 Authentification

- [ ] Inscription libre.
- [ ] E-mail obligatoire.
- [ ] Authentification sécurisée.
- [ ] Vérification e-mail : décision à prendre.
- [ ] Récupération de compte.
- [ ] Sessions sécurisées.
- [ ] Déconnexion.
- [ ] Révocation des sessions.
- [ ] Protection brute force.
- [ ] Protection anti-bot.

## 9.3 Rôles

- [x] Joueur identifié.
- [x] MJ distinct.
- [x] Administrateur distinct.
- [ ] Matrice finale de permissions.
- [ ] Permissions appliquées côté serveur.
- [ ] Administrateur protégé par MFA.
- [ ] MFA MJ décidé.
- [ ] Capitaine traité comme rôle contextuel.

## 9.4 Uploads

- [ ] Formats autorisés.
- [ ] Poids maximal.
- [ ] Dimensions.
- [ ] Type MIME réel contrôlé.
- [ ] Extension non considérée comme preuve.
- [ ] SVG utilisateur interdit par défaut.
- [ ] Nom de stockage généré.
- [ ] Quota serveur.
- [ ] Suppression.
- [ ] Métadonnées.
- [ ] Optimisation.
- [ ] Fichier malformé testé.

## 9.5 Permissions critiques

- [ ] Joueur A ne modifie pas personnage B.
- [ ] Joueur A ne lit pas RP privé B.
- [ ] Modification URL ne contourne pas autorisation.
- [ ] Client modifié ne contourne pas limite personnages.
- [ ] Client modifié ne contourne pas quotas avatars.
- [ ] Client modifié ne falsifie pas combat.
- [ ] Client modifié ne falsifie pas récompenses.
- [ ] Route `/admin` ne constitue pas une autorisation.

### PORTE F — Sécurité

- [x] Prototype statique : acceptable.
- [!] Plateforme persistante : NO-GO tant que les points critiques ne sont pas implémentés.

---

# 10. DÉVELOPPEMENT — FONDATIONS

## 10.1 Dépôt

- [x] Git utilisé.
- [x] GitHub utilisé.
- [x] `main` identifié comme référence.
- [x] `package-lock.json` présent.
- [x] `.gitignore` présent.
- [x] Workflow de déploiement présent.
- [ ] `.gitignore` préparé avant backend/secrets.
- [ ] Stratégie de branches réévaluée si le projet devient multi-développeur.

## 10.2 Scripts

- [x] `npm run dev`.
- [x] `npm run build`.
- [x] `npm run preview`.
- [x] `npm run typecheck`.
- [ ] Tests automatisés ajoutés lorsque pertinents.
- [ ] Lint à évaluer.
- [ ] Formatage automatisé à évaluer.

## 10.3 Dépendances

- [x] Nombre de dépendances limité.
- [x] Lockfile utilisé.
- [!] Plusieurs dépendances déclarées avec `latest`.
- [ ] Politique de versions définie avant exploitation réelle.
- [ ] Vulnérabilités vérifiées régulièrement.
- [ ] Dépendances inutilisées retirées.

## 10.4 Documentation

- [x] README.
- [x] PROJECT.
- [x] SCOPE.
- [x] SECURITY.
- [x] CHECKLIST.
- [ ] DESIGN_RULES.
- [ ] PERMISSIONS.
- [ ] Documents systèmes créés progressivement.
- [ ] Architecture backend documentée lorsqu’elle existe.
- [ ] Variables d’environnement documentées lorsqu’elles existent.

---

# 11. MODULES CONDITIONNELS

## 11.1 Authentification

- [x] Applicable.
- [ ] Technologie.
- [ ] E-mail obligatoire.
- [ ] Vérification e-mail.
- [ ] Mot de passe / Auth provider.
- [ ] Récupération.
- [ ] Suppression du compte.
- [ ] Sessions.
- [ ] MFA rôles privilégiés.

## 11.2 Upload

- [x] Applicable.
- [ ] Grands Avatars.
- [ ] Petits avatars.
- [ ] Limites.
- [ ] Compression.
- [ ] Sécurité.
- [ ] Stockage.
- [ ] Conservation historique.

## 11.3 E-mail

- [~] Probablement applicable.
- [ ] Vérification compte.
- [ ] Récupération compte.
- [ ] Notifications importantes éventuelles.
- [ ] Fournisseur.
- [ ] Domaine d’envoi.
- [ ] SPF.
- [ ] DKIM.
- [ ] DMARC.

## 11.4 Paiement

- [N/A] Aucun paiement prévu.

## 11.5 E-commerce

- [N/A] Hors périmètre.

## 11.6 SMS

- [N/A] Hors périmètre.

## 11.7 IA générative intégrée

- [N/A] Hors périmètre actuel.

## 11.8 Cartographie

- [x] Applicable et déjà largement présente.

## 11.9 Temps réel

- [~] À étudier pour combat et autres actions synchrones.

## 11.10 Notifications push

- [N/A] Non prévues actuellement.

## 11.11 Analytics

- [ ] À décider avant ouverture réelle.
- [ ] Si ajouté, évaluer vie privée et consentement.

---

# 12. TESTS ET QUALITÉ

## 12.1 Build

- [x] Build GitHub Pages fonctionne dans l’état actuel vérifié.
- [ ] `npm run build` après chaque grosse modification.
- [ ] `npm run typecheck` lorsque pertinent.
- [ ] Aucun warning critique ignoré sans justification.

## 12.2 Routing

- [ ] `/`.
- [ ] `/pont`.
- [ ] `/carte`.
- [ ] Secteurs.
- [ ] Systèmes.
- [ ] Objets.
- [ ] Personnages.
- [ ] Dynasties.
- [ ] Vaisseaux.
- [ ] RP.
- [ ] Combat.
- [ ] Lore.
- [ ] Évènements.
- [ ] Compte.
- [ ] Admin.
- [ ] Rafraîchissement direct.
- [ ] Précédent.
- [ ] Suivant.
- [ ] 404 GitHub Pages.
- [ ] Sous-chemin `/GaiaRP/`.

## 12.3 Responsive

- [ ] Desktop.
- [ ] 1180 px.
- [ ] 980 px.
- [ ] 860 px.
- [ ] 650 / 620 px selon composants.
- [ ] Mobile réel.
- [ ] Tablette.
- [ ] Carte.
- [ ] Lore.
- [ ] RP.
- [ ] Combat.
- [ ] Vaisseau.
- [ ] Membres.

## 12.4 Tests futurs comptes

- [ ] Inscription normale.
- [ ] E-mail déjà utilisé.
- [ ] E-mail invalide.
- [ ] Connexion.
- [ ] Mauvais mot de passe.
- [ ] Déconnexion.
- [ ] Récupération.
- [ ] Session expirée.
- [ ] Compte supprimé.

## 12.5 Tests personnages

- [ ] Premier personnage.
- [ ] Deuxième.
- [ ] Troisième.
- [ ] Quatrième refusé sans autorisation.
- [ ] Demande justifiée.
- [ ] Validation selon règle finale.
- [ ] Personnage mort ne compte plus dans la limite selon règle validée.
- [ ] Cas simultané / double clic.

## 12.6 Tests avatars

- [ ] 1er Grand Avatar.
- [ ] 2e Grand Avatar.
- [ ] 3e refusé.
- [ ] 20 petits avatars.
- [ ] 21e refusé.
- [ ] Mauvais format.
- [ ] Fichier trop gros.
- [ ] Faux type MIME.
- [ ] Suppression.
- [ ] Remplacement.
- [ ] Ancien RP conserve son rendu selon règle future.

## 12.7 Tests permissions

- [ ] Joueur.
- [ ] Capitaine.
- [ ] MJ.
- [ ] Administrateur.
- [ ] Joueur A / personnage B.
- [ ] RP privé.
- [ ] Vaisseau étranger.
- [ ] Administration inaccessible.
- [ ] Appel API direct.

## 12.8 Accessibilité

- [ ] Clavier.
- [ ] Focus.
- [ ] Contraste.
- [ ] Titres.
- [ ] Labels.
- [ ] Alternatives images.
- [ ] Zoom.
- [ ] Lecteur d’écran sur parcours critique si retenu.

## 12.9 Régression

- [x] Principe défini.
- [ ] Retester les systèmes directement dépendants après chaque correction.
- [ ] Ne pas livrer un correctif tardif sans test minimal.

### PORTE G — Qualité

- [~] Prototype : contrôle au fil du développement.
- [ ] Version communautaire réelle : tous parcours critiques testés.

---

# 13. RECETTE UTILISATEUR / MJ

Il n’y a pas de client contractuel.

Cette phase est adaptée en **tests utilisateurs / MJ**.

- [N/A] Recette client contractuelle.
- [ ] Organiser des tests joueurs lorsque les parcours sont suffisamment avancés.
- [ ] Organiser des tests MJ.
- [ ] Centraliser les retours.
- [ ] Classer : bug / ajustement / évolution / contenu.
- [ ] Distinguer préférence individuelle et problème généralisable.
- [ ] Retester les corrections.
- [ ] Valider les parcours majeurs avant ouverture réelle.

### PORTE H — Recette

- [N/A] Validation contractuelle client.
- [ ] Validation fonctionnelle interne avant lancement réel.

---

# 14. PRÉPARATION PRODUCTION

> GitHub Pages constitue actuellement une démonstration publique, pas la future production persistante.

## 14.1 Infrastructure

- [ ] Backend production.
- [ ] Base production.
- [ ] Stockage production.
- [ ] Auth production.
- [ ] E-mail production si nécessaire.
- [ ] Domaine final si différent.
- [ ] Environnement de staging si retenu.

## 14.2 Configuration

- [ ] Variables environnement production.
- [ ] Aucun secret test.
- [ ] Debug désactivé.
- [ ] CORS correct.
- [ ] URLs callbacks correctes.
- [ ] Quotas suffisants.
- [ ] Logs production adaptés.

## 14.3 Données

- [ ] Migration des données prototype pertinente définie.
- [ ] Données de test supprimées ou isolées.
- [ ] Compte Administrateur initial créé de façon sécurisée.
- [ ] Sauvegarde initiale.
- [ ] Politique de backup.

## 14.4 Légal

- [ ] Mentions légales.
- [ ] Confidentialité.
- [ ] Conditions d’utilisation.
- [ ] Politique contenus / avatars.
- [ ] Cookies si applicables.

## 14.5 Monitoring

- [ ] Erreurs.
- [ ] Disponibilité.
- [ ] Base.
- [ ] Stockage.
- [ ] Quotas.
- [ ] E-mails.
- [ ] Alertes.

## 14.6 Rollback

- [ ] Version précédente identifiable.
- [ ] Procédure rollback.
- [ ] Sauvegarde disponible.
- [ ] Procédure de restauration.

### PORTE I — Go / No-Go

- [!] Non franchie pour une plateforme réelle avec comptes.
- [x] Prototype statique actuellement déployable.

---

# 15. MISE EN PRODUCTION

## 15.1 Déploiement actuel prototype

- [x] GitHub Actions.
- [x] Push sur `main`.
- [x] Build Vite.
- [x] GitHub Pages.
- [x] `BASE_URL=/GaiaRP/`.

## 15.2 Future mise en production réelle

- [ ] Version identifiée.
- [ ] Backup.
- [ ] Migration.
- [ ] Déploiement.
- [ ] Smoke tests.
- [ ] Connexion.
- [ ] Création compte.
- [ ] Création personnage.
- [ ] Publication RP.
- [ ] Upload avatar.
- [ ] Permissions.
- [ ] E-mail.
- [ ] Mobile.
- [ ] Logs.
- [ ] Monitoring.

---

# 16. LIVRAISON, TRANSFERT ET DOCUMENTATION

## Projet personnel

- [N/A] Livraison à un client.
- [N/A] Transfert de dépôt à un client.
- [N/A] Formation client.
- [N/A] Réception contractuelle.
- [N/A] Solde.
- [N/A] Transfert de droits.

## Documentation interne

- [x] README.
- [x] PROJECT.
- [x] SCOPE.
- [x] SECURITY.
- [x] CHECKLIST.
- [ ] Documentation architecture future.
- [ ] Documentation base.
- [ ] Documentation permissions.
- [ ] Documentation administration.
- [ ] Procédure déploiement.
- [ ] Procédure sauvegarde.
- [ ] Procédure restauration.
- [ ] Procédure incident.
- [ ] Services tiers recensés.

### PORTE J — Documentation

- [~] Structure générale en place.
- [ ] Documentation spécialisée à construire.

---

# 17. GARANTIE CORRECTIVE

- [N/A] Garantie commerciale — projet personnel.

## Gestion des bugs interne

- [ ] Cause recherchée avant patch.
- [ ] Reproduction documentée lorsque nécessaire.
- [ ] Correctif ciblé.
- [ ] Régression testée.
- [ ] Base cassée non réutilisée.
- [ ] Changelog mis à jour lorsque pertinent.

---

# 18. MAINTENANCE CONTINUE

Pas de contrat, mais une maintenance technique du projet reste nécessaire.

## 18.1 Dépendances

- [ ] Vulnérabilités suivies.
- [ ] Mises à jour importantes évaluées.
- [ ] Mises à jour majeures testées.
- [ ] Dépendances abandonnées remplacées si nécessaire.
- [ ] Packages inutiles supprimés.

## 18.2 Infrastructure future

- [ ] Disponibilité.
- [ ] Erreurs.
- [ ] Stockage.
- [ ] Base.
- [ ] Quotas.
- [ ] Coûts.
- [ ] Domaine.
- [ ] E-mail.

## 18.3 Sauvegardes

- [ ] Vérifier leur réussite.
- [ ] Vérifier la rétention.
- [ ] Tester périodiquement la restauration.

## 18.4 Permissions

- [ ] Comptes MJ encore légitimes.
- [ ] Comptes administrateur.
- [ ] Comptes inutiles supprimés.
- [ ] Sessions révoquées après compromission.

---

# 19. GESTION D’INCIDENT

## 19.1 Incident technique

- [ ] Impact identifié.
- [ ] Changement récent vérifié.
- [ ] Logs conservés.
- [ ] Rollback évalué.
- [ ] Cause racine recherchée.
- [ ] Correctif testé.
- [ ] Post-mortem si important.

## 19.2 Incident sécurité

- [ ] Accès compromis révoqués.
- [ ] Secrets tournés.
- [ ] Sessions révoquées.
- [ ] Portée estimée.
- [ ] Données concernées évaluées.
- [ ] Obligations réglementaires évaluées.
- [ ] Incident documenté.
- [ ] Correctif durable.

## 19.3 Perte / corruption de données

- [ ] Écritures fautives stoppées.
- [ ] Étendue évaluée.
- [ ] Backup sain identifié.
- [ ] Restauration testée.
- [ ] Cause corrigée.

## 19.4 Panne fournisseur

- [ ] Statut du fournisseur vérifié.
- [ ] Impact évalué.
- [ ] Fallback utilisé si prévu.
- [ ] Reprise vérifiée.

---

# 20. FIN DE MAINTENANCE / FIN DU PROJET

Gaïa RP n’a actuellement pas de date de fin prévue.

- [N/A] Fin de relation client.
- [N/A] Révocation d’accès prestataire.
- [N/A] Facture de clôture.

Si le projet est un jour abandonné :

- [ ] Export final des données.
- [ ] Sauvegarde finale.
- [ ] Code archivé.
- [ ] Services externes résiliés proprement.
- [ ] Secrets révoqués.
- [ ] Données personnelles traitées selon les obligations applicables.
- [ ] Utilisateurs informés si nécessaire.
- [ ] Dépôt archivé.
- [ ] Documentation de clôture.

---

# 21. CHECKLIST FINALE « NO-GO » AVANT OUVERTURE RÉELLE

**Une plateforme avec comptes réels ne doit pas être considérée prête tant que chaque élément applicable n’est pas `[x]` ou explicitement `[N/A]`.**

- [ ] Périmètre de la version défini.
- [ ] Parcours critiques fonctionnels.
- [ ] Authentification fonctionnelle.
- [ ] E-mail obligatoire correctement traité.
- [ ] Récupération de compte.
- [ ] Permissions testées.
- [ ] MJ et Administrateur correctement séparés.
- [ ] Aucun secret dans le dépôt.
- [ ] Aucun secret dans le frontend.
- [ ] HTTPS.
- [ ] Base protégée.
- [ ] Sauvegardes actives.
- [ ] Restauration testée.
- [ ] Uploads sécurisés.
- [ ] Quotas avatars contrôlés côté serveur.
- [ ] Limite personnages contrôlée côté serveur.
- [ ] RP privés contrôlés côté serveur.
- [ ] Combat sensible non autoritaire côté client.
- [ ] Formulaires protégés contre les abus.
- [ ] Inscription protégée contre les bots raisonnablement.
- [ ] Données personnelles minimisées.
- [ ] Durées de conservation définies.
- [ ] Suppression compte définie.
- [ ] Ancien RP après suppression défini.
- [ ] Avatars historiques définis.
- [ ] Politique de confidentialité.
- [ ] Mentions légales.
- [ ] Conditions d’utilisation si nécessaires.
- [ ] Droits des avatars / contenus utilisateurs cadrés.
- [ ] Responsive.
- [ ] Navigation clavier acceptable.
- [ ] Erreurs compréhensibles.
- [ ] Monitoring.
- [ ] Logs sans secret.
- [ ] Rollback.
- [ ] Documentation technique.
- [ ] Documentation MJ.
- [ ] Aucun élément critique uniquement connu dans une conversation.

---

# 22. RÉFÉRENCES À REVOIR PÉRIODIQUEMENT

Les références techniques et réglementaires doivent être vérifiées au moment où elles deviennent réellement nécessaires.

## Sécurité

- OWASP Top 10.
- OWASP ASVS.
- OWASP Cheat Sheet Series.
- Documentation officielle des technologies retenues.
- Recommandations CNIL en matière de sécurité.

## Vie privée

- RGPD.
- Recommandations CNIL.
- Cookies et traceurs.
- Violations de données.

## Accessibilité

- WCAG.
- RGAA lorsque applicable.

## Technologies

- React.
- TypeScript.
- Vite.
- Fournisseur d’authentification futur.
- Backend futur.
- Base future.
- Stockage futur.
- Hébergeur futur.

---

# 23. DÉFINITION DE « TERMINÉ »

Gaïa RP n’est pas terminé lorsque :

- l’interface est jolie ;
- une page existe ;
- une fonctionnalité marche uniquement avec des données de démonstration ;
- le code fonctionne uniquement en local ;
- une mécanique dépend encore d’un `alert("Prototype")` ;
- la sécurité repose sur le frontend.

Une version réellement exploitable sera considérée suffisamment terminée lorsque :

- [ ] son périmètre est défini ;
- [ ] ses fonctions indispensables sont réalisées ;
- [ ] les comptes fonctionnent ;
- [ ] les données sont persistantes ;
- [ ] les permissions sont sécurisées ;
- [ ] les parcours critiques sont testés ;
- [ ] les données sont protégées ;
- [ ] les uploads sont maîtrisés ;
- [ ] les sauvegardes existent ;
- [ ] la restauration fonctionne ;
- [ ] les fonctions MJ nécessaires existent ;
- [ ] les fonctions administrateur nécessaires existent ;
- [ ] les documents nécessaires existent ;
- [ ] les obligations applicables sont traitées ;
- [ ] aucun risque critique connu n’est laissé sans décision ;
- [ ] aucune fonctionnalité indispensable ne reste un simple placeholder ;
- [ ] chaque ligne pertinente de cette checklist est fermée par `[x]`, `[N/A]` ou une décision documentée.

---

# NOTES PROJET

## Points ouverts prioritaires

- Choix du backend.
- Choix de la base de données.
- Choix de l’authentification.
- Déterminer si l’adresse e-mail doit être vérifiée avant utilisation complète du compte.
- Définir l’identifiant de connexion principal.
- Définir la récupération de compte.
- Définir précisément les permissions MJ.
- Définir précisément les permissions Administrateur.
- Définir le stockage des avatars.
- Définir les formats et tailles d’avatars.
- Définir le comportement d’un avatar supprimé mais utilisé dans un ancien RP.
- Définir le cycle de vie d’un personnage mort / archivé.
- Définir la suppression d’un compte et le sort de ses RP.
- Définir les niveaux de confidentialité des RP.
- Définir la future architecture serveur du combat.

## Risques principaux

- Scope important et nombreux systèmes interdépendants.
- Confusion possible entre prototype et fonctionnalité terminée.
- Croissance de `App.tsx` et du CSS global.
- Future migration des données TypeScript de démonstration.
- Mauvais choix prématuré de backend.
- Permissions complexes.
- Upload de médias utilisateurs.
- Inscription ouverte et abus automatisés.
- Contenu utilisateur.
- Données MJ potentiellement confidentielles.
- Dépendances déclarées en `latest`.

## Hors périmètre confirmé

- Paiement.
- E-commerce.
- Marketplace.
- Publicité.
- Facturation.
- SMS.
- Appels audio / vidéo.
- Application mobile native.
- IA générative directement intégrée au gameplay.
- Simulation économique entièrement autonome.
- Automatisation complète des décisions MJ.

## Prochaines documentations spécialisées

La création doit suivre les besoins réels du développement et non l’ordre de cette liste.

- `DESIGN_RULES.md`
- `PERMISSIONS.md`
- `CHARACTERS.md`
- `RP_SYSTEM.md`
- `TIME_AND_RP.md`
- `SKILLS.md`
- `DYNASTIES.md`
- `SHIPS.md`
- `SPACE_TRAVEL.md`
- `SPACE_COMBAT.md`
- `MISSIONS.md`
- `ECONOMY.md`
- `WORLD_MAP.md`
- `LORE.md`
- documentation backend / base / API lorsque leur conception commence
