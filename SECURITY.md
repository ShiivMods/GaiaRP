# SECURITY.md — RP SF / Gaïa RP

> Ce fichier décrit les risques, décisions et mesures de sécurité propres à RP SF / Gaïa RP.
>
> La référence technique de l’état actuel est toujours la branche `main` du dépôt `ShiivMods/GaiaRP`.
>
> Ce document doit être mis à jour lorsqu’une nouvelle surface sensible apparaît : authentification, backend, base de données, uploads, permissions, administration, stockage privé, API ou service tiers.
>
> Une rubrique non applicable doit être indiquée `N/A` avec une justification.
>
> Ce document constitue un cadre technique de sécurité. Il ne remplace pas un audit professionnel ni une validation juridique lorsque celle-ci devient nécessaire.

---

# 1. Identification

- **Projet :** RP SF / Gaïa RP
- **Type :** Application web communautaire de support à un jeu de rôle
- **Dépôt :** `ShiivMods/GaiaRP`
- **Branche de référence :** `main`
- **Date de création de ce document :** 2026-09-23
- **Responsable sécurité du projet :** propriétaire du projet
- **État actuel :** prototype frontend public
- **Niveau de risque actuel estimé :** Modéré
- **Niveau de risque futur avec comptes/backend/uploads :** Élevé

Le niveau futur est plus important car la plateforme devra notamment gérer :

- des comptes ;
- des personnages appartenant à des joueurs ;
- des RP dont certains peuvent avoir un accès restreint ;
- des médias téléversés ;
- des permissions ;
- des fonctions MJ ;
- des fonctions administratives ;
- des données persistantes.

---

# 2. Principe fondamental

## État actuel

Le projet actuel est principalement une application frontend statique.

Il ne possède actuellement :

- ni véritable authentification ;
- ni backend applicatif ;
- ni base de données distante ;
- ni stockage utilisateur ;
- ni API privée ;
- ni upload utilisateur réel.

Par conséquent :

**toute donnée intégrée au frontend actuel doit être considérée comme publique.**

Masquer une information avec React, CSS, une route ou un mode d’affichage ne constitue pas une protection.

## État futur

Lorsqu’une information devient réellement privée, elle ne doit plus être envoyée au navigateur d’un utilisateur non autorisé.

Cela concernera notamment :

- RP privés ou restreints ;
- informations administratives ;
- données personnelles ;
- informations MJ non révélées ;
- données de personnages auxquelles un utilisateur n’a pas accès ;
- opérations réservées à un rôle.

---

# 3. État de sécurité du dépôt actuel

Au moment de la rédaction :

- le dépôt GitHub est public ;
- GitHub Pages héberge le prototype ;
- GitHub Actions construit et déploie le site ;
- aucun secret applicatif n’est nécessaire au frontend actuel ;
- aucune variable d’environnement secrète n’est actuellement utilisée ;
- `.gitignore` n’exclut pas encore explicitement les fichiers `.env`.

Cette dernière situation n’est pas un problème tant qu’aucun secret n’existe.

**Avant l’introduction du premier véritable secret, `.gitignore` devra être adapté.**

Le dépôt ne doit jamais recevoir accidentellement :

- `.env` réel ;
- mot de passe ;
- clé de base de données ;
- clé d’administration ;
- secret d’authentification ;
- clé privée de stockage ;
- secret webhook ;
- token privé.

Un `.env.example` sans valeurs sensibles pourra être conservé pour documenter la configuration.

---

# 4. Surfaces de sécurité actuelles et futures

| Élément | Aujourd’hui | Cible |
|---|---|---|
| Authentification | Non | Oui |
| Comptes utilisateurs | Non | Oui |
| Interface MJ | Prototype | Oui |
| Interface administrateur | Prototype | Oui |
| Données personnelles | Très limitées / démonstration | Oui |
| Données privées | Non garanties | Oui |
| Upload de fichiers | Non | Oui |
| Base de données | Non | Oui |
| API | Non | Probablement |
| Services externes | GitHub principalement | Oui probablement |
| Paiement | Non | Non prévu |
| E-mails transactionnels | Non | À définir |
| Clés API / secrets | Non | Oui probable |
| Journalisation serveur | Non | Oui |
| Contenu utilisateur | Prototype RP | Oui |
| Rôles / permissions | Simulation frontend | Oui, sécurisés |

---

# 5. Principaux actifs à protéger

À terme, les actifs importants seront notamment :

- comptes joueurs ;
- sessions ;
- personnages ;
- avatars ;
- RP ;
- messages ;
- RP à accès restreint ;
- dynasties ;
- vaisseaux ;
- inventaires ;
- progression ;
- données économiques ;
- missions ;
- récompenses ;
- données du monde ;
- données MJ ;
- permissions ;
- données administratives ;
- secrets techniques ;
- sauvegardes.

---

# 6. Modèle de menace

## Acteurs potentiellement malveillants

- [x] Visiteur anonyme.
- [x] Bot / automatisation.
- [ ] Joueur authentifié malveillant — futur.
- [ ] Ancien joueur — futur.
- [ ] Compte joueur compromis — futur.
- [ ] Compte MJ compromis — futur.
- [ ] Compte administrateur compromis — futur.
- [ ] Service tiers compromis — futur.
- [ ] Dépendance logicielle compromise.

## Actions qu’un attaquant pourrait chercher à réaliser

- accéder à un RP privé ;
- accéder à des données appartenant à un autre joueur ;
- modifier un personnage ne lui appartenant pas ;
- supprimer des données ;
- prendre le contrôle d’un compte ;
- obtenir les permissions MJ ;
- obtenir les permissions administrateur ;
- manipuler des données de combat ;
- modifier artificiellement une progression ;
- modifier une récompense ;
- modifier une économie ;
- contourner une limite de personnages ;
- contourner les quotas d’avatars ;
- envoyer des fichiers malveillants ;
- spammer le service ;
- créer massivement des comptes ;
- voler des secrets ;
- provoquer une indisponibilité ;
- exploiter une dépendance vulnérable.

---

# 7. Surfaces d’attaque principales futures

- [ ] Inscription.
- [ ] Connexion.
- [ ] Récupération de compte.
- [ ] Sessions.
- [ ] Formulaires de personnage.
- [ ] Publication de RP.
- [ ] Édition de RP.
- [ ] Upload d’avatars.
- [ ] Gestion des vaisseaux.
- [ ] Combat.
- [ ] Missions.
- [ ] Administration MJ.
- [ ] Administration technique.
- [ ] API.
- [ ] Base de données.
- [ ] Services tiers.
- [ ] Webhooks éventuels.
- [ ] E-mails éventuels.

---

# 8. Authentification

**Statut actuel :** `NON IMPLÉMENTÉ`

L’inscription finale sera ouverte à tous.

N’importe quelle personne pourra créer librement son compte.

Une **adresse e-mail est obligatoire** à l’inscription.

Le système d’authentification devra utiliser une solution reconnue.

## Principes obligatoires

- [ ] Aucun mot de passe stocké en clair.
- [ ] Aucun système cryptographique artisanal.
- [ ] Hachage des mots de passe confié à une solution éprouvée si les mots de passe sont gérés par l’application.
- [ ] Sessions sécurisées.
- [ ] Expiration adaptée.
- [ ] Déconnexion réelle.
- [ ] Révocation possible lorsque nécessaire.
- [ ] Protection contre les tentatives répétées.
- [ ] Récupération de compte sécurisée.
- [ ] Messages ne permettant pas inutilement d’énumérer les comptes.
- [ ] Protection contre l’automatisation abusive de l’inscription.

---

# 9. MFA

## Joueur normal

**À évaluer.**

Le MFA n’est pas imposé par défaut à ce stade.

## MJ

Le MFA doit être étudié sérieusement compte tenu des pouvoirs RP du rôle.

## Administrateur

Le MFA doit être utilisé lorsque la solution technique retenue le permet raisonnablement.

Les comptes administrateur constituent une cible critique.

---

# 10. Autorisation et permissions

Les contrôles de permissions devront être appliqués **côté serveur ou au niveau du système de données sécurisé**.

Masquer un bouton React n’est jamais suffisant.

## Principe

Pour chaque opération sensible, vérifier :

1. qui est l’utilisateur ;
2. quel personnage / objet est visé ;
3. quel lien existe entre l’utilisateur et cette ressource ;
4. quel rôle contextuel il possède ;
5. si l’action est autorisée.

---

# 11. Séparation MJ / Administrateur

MJ et Administrateur sont deux rôles privilégiés distincts.

## MJ

Le MJ intervient sur le **domaine RP et jeu**.

Son périmètre exact sera défini ultérieurement dans `PERMISSIONS.md`.

Il pourra notamment être amené à gérer selon les règles finales :

- personnages ;
- missions ;
- événements ;
- monde ;
- lore ;
- temps ;
- économie RP ;
- validations ;
- récompenses ;
- demandes exceptionnelles de personnages.

## Administrateur

L’Administrateur intervient sur le **domaine plateforme et technique**.

Il peut notamment gérer :

- comptes ;
- rôles ;
- permissions ;
- configuration ;
- sécurité ;
- services techniques ;
- administration générale.

Une permission MJ ne confère jamais automatiquement des droits Administrateur.

L’Administrateur doit pouvoir gérer l’attribution et le retrait des rôles privilégiés.

---

# 12. Propriété des personnages

Un joueur ne doit pouvoir modifier que les personnages sur lesquels il possède les droits nécessaires.

Le serveur devra vérifier la relation :

`compte → personnage`

avant toute opération sensible.

Modifier simplement un identifiant dans une URL ou une requête ne doit jamais permettre d’accéder aux données d’un autre joueur.

---

# 13. Limite de personnages

Un joueur peut posséder jusqu’à :

**3 personnages vivants**

sans autorisation exceptionnelle.

Au-delà :

- une demande explicite est requise ;
- une justification est requise ;
- une validation est requise.

Cette limite doit être vérifiée côté serveur.

Il ne doit pas être possible de la contourner :

- en modifiant le frontend ;
- en appelant directement une API ;
- en répétant rapidement plusieurs requêtes ;
- en ouvrant plusieurs onglets.

La création devra être protégée contre les conditions de concurrence.

---

# 14. Permissions contextuelles

Certains droits dépendent du contexte du jeu.

Exemples :

- joueur propriétaire du personnage ;
- capitaine ;
- membre d’équipage ;
- MJ ;
- administrateur.

Un rôle comme **Capitaine** ne doit pas automatiquement devenir un rôle global du compte.

Son autorisation doit dépendre du vaisseau concerné.

---

# 15. Administration actuelle

La route `/admin` et les modes administrateur actuellement présents dans le prototype **ne constituent pas une authentification ou une protection**.

Ils doivent être considérés uniquement comme des interfaces de développement.

Tant qu’aucun contrôle d’autorisation réel n’existe :

- aucune donnée privée ne doit leur être confiée ;
- aucune opération dangereuse ne doit dépendre uniquement de cette route ;
- aucune clé d’administration ne doit être placée dans le frontend.

---

# 16. RP privés et accès restreints

Le système RP prévoit des modes d’accès et des invitations.

Lorsqu’un RP est privé ou restreint, l’autorisation doit être contrôlée avant de retourner son contenu.

Le système ne doit pas :

1. envoyer le RP au navigateur ;
2. puis simplement le masquer avec React.

La réponse serveur elle-même doit respecter les permissions.

---

# 17. Validation des entrées

Toute donnée utilisateur doit être considérée non fiable.

Cela concerne notamment :

- inscription ;
- profil ;
- nom de personnage ;
- biographie ;
- messages RP ;
- recherche ;
- filtres ;
- noms de vaisseaux ;
- noms de dynasties ;
- contenus administratifs ;
- uploads ;
- paramètres URL ;
- API.

## Mesures

- [ ] Validation côté serveur.
- [ ] Longueurs minimales / maximales.
- [ ] Types contrôlés.
- [ ] Valeurs prédéfinies limitées à une liste autorisée lorsque pertinent.
- [ ] Requêtes paramétrées / ORM correctement utilisé.
- [ ] Encodage adapté des sorties.
- [ ] Messages d’erreur ne révélant pas la stack technique.

---

# 18. Contenu RP et mise en forme

Le système RP possède une syntaxe de mise en forme propre.

Le contenu utilisateur ne doit pas permettre d’injecter arbitrairement du HTML ou du JavaScript.

Principe :

**le texte RP est du contenu, pas du code.**

Si une syntaxe de balises comme :

- gras ;
- italique ;
- centrage ;
- dialogues ;
- autres éléments RP ;

est convertie vers du HTML, utiliser une transformation contrôlée.

Ne jamais considérer du HTML utilisateur brut comme sûr.

---

# 19. Vulnérabilités web à vérifier

Selon l’architecture finale :

- [ ] Broken Access Control / IDOR.
- [ ] Mauvaise configuration de sécurité.
- [ ] Failles liées aux dépendances.
- [ ] Cryptographie incorrecte.
- [ ] Injection.
- [ ] XSS.
- [ ] CSRF.
- [ ] SSRF si applicable.
- [ ] Path traversal.
- [ ] Redirections non sûres.
- [ ] Sessions incorrectes.
- [ ] Uploads dangereux.
- [ ] Abus de logique métier.
- [ ] Gestion incorrecte des erreurs.

---

# 20. Protection contre les abus

L’inscription étant ouverte, la plateforme devra anticiper les abus automatisés.

À évaluer lors du backend :

- [ ] Rate limiting inscription.
- [ ] Rate limiting connexion.
- [ ] Rate limiting récupération de compte.
- [ ] Rate limiting publication.
- [ ] Rate limiting uploads.
- [ ] Protection anti-bot.
- [ ] Limitation des créations.
- [ ] Blocage temporaire après comportement abusif.
- [ ] Modération.
- [ ] Signalement.
- [ ] Suspension de compte.

La solution anti-bot exacte n’est pas encore définie.

---

# 21. Protection réseau / DDoS

## Prototype actuel

Le projet est hébergé par GitHub Pages.

Aucune infrastructure réseau propre au projet n’est actuellement administrée.

## Futur backend

Lors du choix de l’hébergement, évaluer :

- protection DDoS du fournisseur ;
- reverse proxy ;
- CDN ;
- WAF si justifié ;
- rate limiting ;
- protection de l’origine ;
- quotas ;
- limites de bande passante.

Ne pas ajouter un WAF complexe uniquement par principe si l’architecture ne le justifie pas.

---

# 22. Upload des avatars

**Statut : PRÉVU**

Les joueurs géreront eux-mêmes les avatars de leurs personnages.

## Quotas fonctionnels

Par personnage :

- **2 Grands Avatars maximum** ;
- **20 petits avatars maximum**.

Ces limites doivent être appliquées côté serveur.

---

# 23. Sécurité des uploads

Avant activation des uploads :

- [ ] Définir les formats autorisés.
- [ ] Définir le poids maximal.
- [ ] Vérifier le type réel du fichier.
- [ ] Ne pas se fier uniquement à l’extension.
- [ ] Générer un identifiant / nom de stockage sûr.
- [ ] Ne pas utiliser directement le nom fourni comme chemin.
- [ ] Limiter le nombre de fichiers côté serveur.
- [ ] Empêcher l’exécution des fichiers.
- [ ] Contrôler les accès.
- [ ] Optimiser les images.
- [ ] Nettoyer les métadonnées sensibles lorsque pertinent.
- [ ] Gérer correctement la suppression.
- [ ] Sauvegarder les fichiers lorsque nécessaire.
- [ ] Tester les fichiers malformés.

## Formats

Les formats définitifs restent à déterminer.

Par sécurité, les formats d’image raster classiques doivent être privilégiés.

Les uploads SVG utilisateur ne devront pas être acceptés sans raison explicite et traitement sécurisé, car un SVG peut contenir des éléments actifs.

---

# 24. Cycle de vie des avatars

Une décision particulière devra être prise concernant les avatars déjà utilisés dans d’anciens RP.

Le système doit éviter qu’un utilisateur supprimant ou remplaçant une image provoque involontairement la disparition ou la modification visuelle de nombreux anciens messages.

Cette règle devra être définie avant la conception définitive du stockage.

---

# 25. Base de données

**Statut actuel : N/A**

Aucune base applicative n’est actuellement utilisée.

## Exigences futures

- [ ] Base inaccessible publiquement sauf interface nécessaire.
- [ ] Secrets hors du code source.
- [ ] Permissions minimales.
- [ ] Relations et contraintes cohérentes.
- [ ] Contrôles d’accès serveur.
- [ ] Sauvegardes.
- [ ] Restaurations testées.
- [ ] Environnements séparés.
- [ ] Suppressions critiques protégées.
- [ ] Migrations versionnées.

Si la technologie choisie propose des politiques d’accès au niveau de la base, elles devront être utilisées lorsque pertinentes.

---

# 26. API / backend

**Statut actuel : N/A**

Lorsqu’une API existe :

- [ ] Authentification.
- [ ] Autorisation par ressource.
- [ ] Validation des paramètres.
- [ ] Taille maximale des requêtes.
- [ ] Rate limiting lorsque nécessaire.
- [ ] Gestion cohérente des erreurs.
- [ ] Aucun détail de stack en production.
- [ ] Protection contre double traitement.
- [ ] Idempotence des actions qui l’exigent.
- [ ] Endpoints administratifs protégés.
- [ ] CORS limité aux origines nécessaires.

---

# 27. Actions critiques côté serveur

Les règles importantes ne doivent pas dépendre du frontend.

Exemples devant être vérifiés côté serveur :

- limite de personnages ;
- propriétaire d’un personnage ;
- quotas d’avatars ;
- modification d’un vaisseau ;
- permissions de capitaine ;
- accès à un RP privé ;
- progression ;
- récompenses ;
- économie ;
- actions de combat ;
- validation MJ ;
- actions d’administration.

---

# 28. Combat spatial

Lorsque le combat devient multi-utilisateur et persistant :

**le client ne doit jamais être autoritaire sur le résultat.**

Le navigateur peut proposer une action.

Le serveur doit décider si cette action :

- est autorisée ;
- est valide ;
- respecte le tour ;
- respecte le poste ;
- respecte les ressources ;
- respecte les règles.

Un joueur ne doit pas pouvoir modifier les dégâts ou résultats simplement en manipulant son navigateur.

---

# 29. Secrets et variables d’environnement

## Actuellement

Aucun secret applicatif réel n’est identifié.

## Avant introduction d’un secret

Modifier `.gitignore` afin d’exclure au minimum les fichiers d’environnement sensibles utilisés par le projet.

Une structure du type suivant pourra être utilisée :

```text
.env
.env.local
.env.*.local
```

Un fichier :

```text
.env.example
```

peut être versionné à condition de ne contenir aucune valeur secrète.

## Règles

- [ ] Aucun secret réel dans Git.
- [ ] Aucun secret dans le frontend.
- [ ] Secrets séparés entre développement et production.
- [ ] Secrets absents des logs.
- [ ] Rotation possible.
- [ ] Révocation possible.
- [ ] Permissions minimales.

---

# 30. Dépôt public

Le dépôt est actuellement public.

Cela signifie notamment que doivent être considérés publics :

- code source ;
- données intégrées au dépôt ;
- assets versionnés ;
- règles présentes dans le frontend ;
- endpoints publics ;
- structure de l’application.

Il est interdit de compter sur « personne ne regardera le code » comme mesure de sécurité.

---

# 31. Données MJ et secrets de jeu

À terme, certaines informations de jeu pourront être inconnues des joueurs.

Exemples :

- événements futurs ;
- secrets de lore ;
- informations non découvertes ;
- données réservées au MJ.

Si ces informations doivent réellement rester secrètes, elles ne devront pas être incluses dans le bundle frontend public avant leur révélation.

Le simple fait de ne pas les afficher dans l’interface n’est pas suffisant.

---

# 32. Services tiers et dépendances actuelles

| Service / bibliothèque | Usage | Données utilisateur transmises actuellement | Secret requis | Criticité |
|---|---|---|---|---|
| GitHub | Dépôt | Non par l’application | Compte GitHub | Élevée pour le développement |
| GitHub Actions | Build / déploiement | Non | Permissions GitHub | Modérée |
| GitHub Pages | Hébergement prototype | Requêtes web normales | Non applicatif | Modérée |
| npm | Installation dépendances | Non | Non | Modérée |
| React | Frontend | N/A | Non | Modérée |
| TypeScript | Développement | N/A | Non | Faible |
| Vite | Build | N/A | Non | Modérée |

Les futurs fournisseurs devront être ajoutés à cette liste.

---

# 33. Dépendances logicielles

Le projet utilise actuellement un `package-lock.json` et le workflow exécute :

`npm ci`

ce qui améliore la reproductibilité du build.

Cependant, `package.json` référence actuellement plusieurs dépendances avec :

`latest`

Cela doit être surveillé.

Une régénération du lockfile peut sinon introduire une nouvelle version importante sans décision consciente.

## Avant une version réellement exploitée

- [ ] Définir une politique de versions.
- [ ] Conserver le lockfile.
- [ ] Vérifier les mises à jour majeures.
- [ ] Scanner régulièrement les vulnérabilités.
- [ ] Supprimer les dépendances inutiles.
- [ ] Tester les mises à jour importantes.

---

# 34. Frontend et navigateur

- [x] Aucun secret applicatif actuellement nécessaire.
- [ ] Aucun futur secret ne doit entrer dans le bundle frontend.
- [ ] Les contrôles frontend ne remplacent jamais le serveur.
- [ ] Les données privées ne doivent pas être préchargées inutilement.
- [ ] Le stockage navigateur doit être minimisé.
- [ ] Les données sensibles ne doivent pas être conservées en clair dans `localStorage` simplement par facilité.
- [ ] Les bibliothèques tierces chargées côté navigateur doivent être limitées.

---

# 35. Cookies et sessions

**N/A actuellement.**

Lors de l’authentification, la stratégie devra être définie.

Lorsque des cookies de session sont utilisés, évaluer notamment :

- `Secure` ;
- `HttpOnly` ;
- `SameSite` ;
- expiration ;
- protection CSRF ;
- invalidation.

Ne pas choisir `localStorage` pour des secrets d’authentification uniquement parce que son utilisation est plus simple.

---

# 36. E-mails

**Statut : PRÉVU / À DÉFINIR**

Une adresse e-mail étant obligatoire à l’inscription, un système e-mail pourra notamment devenir nécessaire pour :

- vérification éventuelle ;
- récupération d’accès ;
- notifications importantes.

Décisions déjà prises :

- l’adresse e-mail est obligatoire.

Restent à définir :

- si la vérification de l’adresse est obligatoire avant certaines actions ;
- l’identifiant de connexion principal ;
- le mécanisme précis de récupération ;
- le changement d’adresse e-mail.

Si des e-mails sont utilisés :

- [ ] Aucun mot de passe envoyé.
- [ ] Aucun secret permanent envoyé.
- [ ] Liens sensibles à durée limitée.
- [ ] Jetons à usage unique lorsque nécessaire.
- [ ] Données personnelles limitées.
- [ ] Service d’envoi sécurisé.
- [ ] SPF / DKIM / DMARC évalués en production.

---

# 37. Paiement

**N/A — aucun paiement intégré n’est prévu dans le périmètre actuel.**

Aucune donnée bancaire ne doit être collectée.

---

# 38. Journalisation

## Actuellement

Aucun véritable système de logs serveur applicatifs n’existe.

## À terme

Événements potentiellement utiles :

- connexions sensibles ;
- échecs répétés ;
- actions MJ ;
- actions administrateur ;
- changements de permissions ;
- validation d’un personnage supplémentaire ;
- suppressions importantes ;
- modifications importantes ;
- uploads rejetés ;
- erreurs serveur ;
- anomalies d’API.

## Ne pas journaliser inutilement

Éviter notamment :

- mots de passe ;
- tokens complets ;
- secrets ;
- contenu intégral des RP sans nécessité ;
- données personnelles non pertinentes.

---

# 39. Sauvegardes

## Aujourd’hui

Git fournit un historique du code et des assets versionnés.

**Git n’est pas une sauvegarde de base de données utilisateur.**

## À terme

Sauvegarder au minimum lorsque nécessaire :

- base de données ;
- avatars et médias ;
- configuration critique ;
- données du monde modifiables ;
- RP ;
- personnages.

Définir :

- fréquence ;
- rétention ;
- emplacement ;
- responsable ;
- chiffrement si nécessaire.

---

# 40. Restauration

Une sauvegarde ne doit pas être considérée comme fiable uniquement parce qu’un fournisseur affiche « Backup enabled ».

Avant utilisation réelle :

- [ ] procédure écrite ;
- [ ] restauration testée ;
- [ ] restauration de base testée ;
- [ ] restauration des médias testée ;
- [ ] responsabilité définie.

---

# 41. Hébergement actuel

**GitHub Pages**

Avantages actuels :

- architecture simple ;
- aucune base exposée ;
- aucun serveur applicatif propre ;
- aucun secret frontend requis.

Limites :

- hébergement statique ;
- aucune véritable authentification applicative ;
- aucune confidentialité serveur ;
- aucune persistance utilisateur.

Un changement d’infrastructure sera nécessaire pour certaines fonctionnalités futures.

---

# 42. Déploiement GitHub Actions

Le workflow actuel déploie automatiquement les pushes sur `main`.

Les permissions actuellement demandées sont limitées à :

- lecture du contenu ;
- écriture GitHub Pages ;
- émission du token d’identité nécessaire au déploiement.

Cette configuration doit rester limitée au strict nécessaire.

Toute nouvelle permission devra avoir une justification.

---

# 43. Comptes techniques

## Actuellement

Compte principal critique :

- compte GitHub propriétaire / administrateur du dépôt.

Il doit utiliser :

- mot de passe unique ;
- MFA ;
- méthode de récupération sûre.

## Futur

Ajouter à ce registre :

- backend ;
- base ;
- stockage ;
- fournisseur d’authentification ;
- e-mail ;
- monitoring ;
- domaine ;
- autres services.

---

# 44. Environnements de développement

Lorsque le backend apparaîtra :

- [ ] données production séparées ;
- [ ] clés production séparées ;
- [ ] base développement séparée ;
- [ ] stockage développement séparé ;
- [ ] comptes de test sans droits production ;
- [ ] données personnelles réelles évitées en développement ;
- [ ] outils debug non publics.

---

# 45. Protection contre l’usurpation

L’inscription ouverte implique un risque :

- pseudo imitant un autre utilisateur ;
- personnage copiant un autre personnage ;
- contenu se faisant passer pour une autorité du site.

Les règles de nommage et d’unicité seront définies avec le système Compte / Personnage.

Les comptes officiels MJ / administration devront être clairement identifiables.

---

# 46. Confidentialité et minimisation

Principe :

**ne collecter que ce dont Gaïa RP a réellement besoin.**

Avant le backend, définir précisément les données nécessaires à un compte.

Ne pas collecter par défaut :

- adresse postale ;
- nom réel ;
- téléphone ;
- date de naissance réelle ;
- autres informations privées ;

si aucune fonctionnalité ne les nécessite.

L’adresse e-mail constitue une exception déjà validée car elle est obligatoire pour le compte.

---

# 47. Avatars et données personnelles

Un avatar téléversé peut représenter une personne réelle et donc constituer une donnée personnelle.

Le système doit :

- informer l’utilisateur de sa responsabilité sur le média ;
- limiter les traitements au nécessaire ;
- permettre la suppression dans les conditions définies ;
- supprimer les métadonnées inutiles lorsque pertinent ;
- éviter d’exposer des fichiers privés involontairement.

---

# 48. RGPD / conformité future

Avant ouverture réelle des comptes :

- [ ] Finalités des données définies.
- [ ] Données minimisées.
- [ ] Durées de conservation définies.
- [ ] Politique de confidentialité.
- [ ] Information des utilisateurs.
- [ ] Procédure d’accès.
- [ ] Procédure de rectification.
- [ ] Procédure de suppression.
- [ ] Gestion des comptes supprimés.
- [ ] Gestion des RP après suppression du compte définie.
- [ ] Gestion des avatars après suppression définie.
- [ ] Sous-traitants identifiés.
- [ ] Localisation des données vérifiée.
- [ ] Transferts hors UE étudiés lorsque pertinents.
- [ ] Procédure de violation de données.
- [ ] Cookies / traceurs vérifiés.

La règle métier concernant la conservation des RP après suppression d’un utilisateur devra être définie explicitement.

---

# 49. Gestion d’incident

En cas d’incident :

1. identifier ;
2. limiter l’impact ;
3. préserver les éléments utiles au diagnostic ;
4. révoquer les accès compromis ;
5. renouveler les secrets compromis ;
6. corriger la cause ;
7. vérifier les systèmes potentiellement affectés ;
8. restaurer si nécessaire ;
9. documenter ;
10. informer les personnes compétentes lorsque nécessaire ;
11. effectuer un retour d’expérience.

---

# 50. Secret exposé

Si un secret est :

- commité dans Git ;
- affiché dans un log ;
- visible dans une capture ;
- envoyé au mauvais destinataire ;

le considérer comme **compromis**.

Procédure :

1. révoquer ;
2. renouveler ;
3. mettre à jour l’application ;
4. vérifier l’utilisation éventuelle du secret ;
5. retirer la valeur des emplacements publics lorsque possible.

Supprimer simplement la ligne du dernier commit ne suffit pas.

---

# 51. Compte compromis

Prévoir à terme :

- révocation des sessions ;
- changement d’identifiants ;
- vérification des actions sensibles récentes ;
- restauration éventuelle ;
- information de l’utilisateur ;
- journalisation de l’incident.

Pour un compte MJ / administrateur, vérifier également :

- modifications de permissions ;
- suppressions ;
- validations ;
- modifications économiques ;
- autres actions critiques.

---

# 52. Modération et contenu utilisateur

Les joueurs pourront produire notamment :

- RP ;
- descriptions ;
- personnages ;
- avatars.

Une procédure devra permettre de gérer :

- contenu manifestement abusif ;
- spam ;
- médias problématiques ;
- usurpation ;
- signalements ;
- sanctions éventuelles.

Les règles détaillées seront définies dans les documents communautaires / permissions.

---

# 53. Tests de sécurité avant mise en production

Lorsque les fonctionnalités concernées existent :

- [ ] Tester utilisateur A → personnage utilisateur B.
- [ ] Tester utilisateur A → RP privé de B.
- [ ] Tester modification directe d’un identifiant d’URL.
- [ ] Tester appels API directs sans bouton frontend.
- [ ] Tester création d’un 4e personnage vivant sans autorisation.
- [ ] Tester deux créations simultanées autour de la limite.
- [ ] Tester troisième / quatrième Grand Avatar.
- [ ] Tester vingt-et-unième petit avatar.
- [ ] Tester faux type MIME.
- [ ] Tester extension falsifiée.
- [ ] Tester fichier trop volumineux.
- [ ] Tester fichier malformé.
- [ ] Tester contenu HTML / script.
- [ ] Tester entrées extrêmes.
- [ ] Tester rate limiting.
- [ ] Tester récupération de compte.
- [ ] Tester expiration de session.
- [ ] Tester déconnexion.
- [ ] Tester permissions MJ.
- [ ] Tester permissions administrateur.
- [ ] Vérifier absence de secrets Git.
- [ ] Scanner les dépendances.
- [ ] Tester sauvegarde.
- [ ] Tester restauration.

---

# 54. Revue OWASP

Avant une vraie mise en production avec backend, réaliser une revue des catégories OWASP pertinentes.

Le Top 10 constitue un point de départ et non une validation complète.

Pour les parties importantes, utiliser également les recommandations ASVS ou les guides spécialisés correspondant à la technologie retenue.

---

# 55. Risques actuels identifiés

| Risque | État | Impact | Traitement |
|---|---|---|---|
| Confondre `/admin` avec une vraie protection | Présent conceptuellement | Élevé si données privées ajoutées | Documenté : prototype uniquement |
| Données secrètes intégrées au frontend | Risque futur | Élevé | Toute donnée frontend considérée publique |
| Introduction future d’un `.env` dans Git | Possible | Critique | Adapter `.gitignore` avant secrets |
| Dépendances `latest` | Présent | Modéré | Lockfile + politique de versions future |
| Absence de backend sécurisé | Normal actuellement | N/A prototype | Bloquant avant plateforme réelle |
| Upload malveillant | Futur | Élevé | Pipeline d’upload sécurisé |
| Contournement limite personnages | Futur | Moyen | Validation serveur |
| Contournement quotas avatars | Futur | Moyen | Validation serveur |
| Accès à un RP privé | Futur | Élevé | Autorisation serveur |
| Manipulation du combat côté client | Futur | Élevé | Serveur autoritaire |
| Compte MJ compromis | Futur | Élevé | MFA étudié + audit |
| Compte Administrateur compromis | Futur | Critique | MFA + audit + séparation des rôles |
| Bots sur inscription ouverte | Futur | Moyen | Rate limit + anti-abus |

---

# 56. Risques acceptés actuellement

## Prototype public

Le projet accepte actuellement que :

- le code soit public ;
- les données embarquées dans le frontend soient consultables ;
- les interfaces admin de prototype puissent être ouvertes ;
- les données de démonstration ne disposent pas de confidentialité réelle.

Cette acceptation est valable uniquement parce qu’aucune donnée réellement privée ou opération administrative sensible ne doit actuellement dépendre de ces mécanismes.

Elle cesse d’être acceptable dès l’introduction de données réelles nécessitant une protection.

---

# 57. Points bloquants avant comptes réels

Ne pas ouvrir de véritables comptes utilisateurs tant que les éléments applicables suivants ne sont pas traités :

- [ ] Authentification choisie.
- [ ] Adresse e-mail gérée correctement.
- [ ] Sessions sécurisées.
- [ ] Backend / stockage persistant sécurisé.
- [ ] Autorisation côté serveur.
- [ ] Modèle utilisateur défini.
- [ ] Relation compte ↔ personnage définie.
- [ ] Procédure de récupération définie.
- [ ] Protection contre abus d’inscription.
- [ ] Données personnelles identifiées.
- [ ] Politique de sauvegarde définie.
- [ ] Procédure de suppression définie.
- [ ] Mentions / politique de confidentialité préparées lorsque requises.

---

# 58. Points bloquants avant uploads réels

Ne pas activer les uploads d’avatars tant que :

- [ ] Stockage choisi.
- [ ] Permissions configurées.
- [ ] Types autorisés définis.
- [ ] Taille maximale définie.
- [ ] Contrôle réel du fichier implémenté.
- [ ] Noms de stockage sûrs.
- [ ] Quotas 2 / 20 appliqués serveur.
- [ ] Optimisation définie.
- [ ] Suppression définie.
- [ ] Sauvegarde des médias évaluée.
- [ ] Anciennes références RP traitées correctement.

---

# 59. Points bloquants avant administration réelle

Ne pas donner de pouvoirs administratifs réels tant que :

- [ ] Authentification existe.
- [ ] Rôle MJ réellement vérifié.
- [ ] Rôle Administrateur réellement vérifié.
- [ ] Permissions serveur existent.
- [ ] Séparation MJ / Administrateur existe.
- [ ] Aucun secret administrateur n’est dans le frontend.
- [ ] Actions destructrices nécessitent une confirmation adaptée.
- [ ] Opérations importantes sont journalisées.
- [ ] Comptes privilégiés sont correctement sécurisés.
- [ ] Révocation des droits est possible.

---

# 60. Points bloquants avant données privées

Aucune donnée censée être confidentielle ne doit être intégrée comme simple constante du frontend public.

Cela concerne notamment à terme :

- RP privés ;
- secrets MJ ;
- données non découvertes devant réellement rester secrètes ;
- informations personnelles privées.

---

# 61. Validation sécurité actuelle

## Prototype frontend

**Statut : GO pour prototype public**

Sous les conditions suivantes :

- aucune véritable donnée privée ;
- aucun véritable secret ;
- aucun pouvoir administrateur sensible ;
- aucune promesse de sécurité reposant sur le frontend.

## Plateforme persistante avec comptes

**Statut : NO-GO actuellement**

C’est normal à ce stade.

Le backend, l’authentification, les permissions, les sauvegardes et les autres protections doivent être conçus avant cette transition.

---

# 62. Décisions de sécurité validées

- Le frontend actuel est considéré public.
- Une information réellement privée ne devra pas être protégée uniquement par l’interface.
- L’inscription sera ouverte.
- Une adresse e-mail sera obligatoire.
- Les protections contre les abus devront tenir compte de cette inscription ouverte.
- La limite de trois personnages vivants devra être appliquée côté serveur.
- Les joueurs géreront leurs propres avatars.
- Les quotas de deux Grands Avatars et vingt petits avatars devront être appliqués côté serveur.
- MJ et Administrateur sont deux rôles distincts.
- Le MJ agit sur le domaine RP / jeu.
- L’Administrateur agit sur le domaine plateforme / technique.
- Les fonctions MJ / administrateur devront disposer d’une véritable autorisation.
- Le futur moteur de combat ne devra pas faire confiance au navigateur pour les résultats.
- Les secrets futurs ne devront jamais être commités.
- La stratégie de sauvegarde devra inclure les données persistantes et, lorsque nécessaire, les médias.

---

# 63. Décisions restant à prendre

Avant le backend, déterminer notamment :

## Compte

Décisions validées :

- inscription ouverte ;
- adresse e-mail obligatoire.

Restent à définir :

- identifiant de connexion principal ;
- vérification obligatoire ou non de l’adresse e-mail avant certaines actions ;
- mécanisme précis de récupération du compte ;
- règles de changement d’adresse e-mail.

## Rôles

Décisions validées :

### MJ

Le MJ intervient sur le domaine RP et les systèmes de jeu.

Son périmètre exact sera défini dans `PERMISSIONS.md`.

### Administrateur

L’Administrateur intervient sur le domaine technique et global de la plateforme.

Il peut notamment gérer :

- comptes ;
- rôles ;
- permissions ;
- configuration ;
- sécurité ;
- services techniques ;
- administration générale.

Une permission MJ ne confère jamais automatiquement des droits Administrateur.

## Avatars

- formats ;
- poids ;
- dimensions ;
- optimisation ;
- conservation historique ;
- suppression.

## RP

- niveaux d’accès exacts ;
- comportement après suppression d’un compte ;
- comportement après suppression d’un personnage ;
- édition et historique.

## Infrastructure

- backend ;
- base de données ;
- authentification ;
- stockage ;
- hébergement ;
- sauvegardes ;
- monitoring.

---

# 64. Mise à jour obligatoire de ce document

`SECURITY.md` doit être révisé lorsque l’un des éléments suivants est introduit ou modifié :

- authentification ;
- backend ;
- base ;
- stockage ;
- upload ;
- service externe ;
- permission ;
- rôle ;
- API ;
- données privées ;
- données personnelles ;
- nouvelle action administrative ;
- nouveau traitement automatisé important ;
- nouvelle dépendance critique.

La sécurité ne doit jamais être considérée comme « terminée une fois pour toutes ».
