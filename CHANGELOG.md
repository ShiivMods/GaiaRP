## 0.6.dev50
- Correctif de build GitHub Pages : désactivation explicite de `noUncheckedSideEffectImports` pour empêcher TypeScript de bloquer sur `import './styles.css'`.
- Conservation du correctif dev49 pour les chemins d’assets basés sur `import.meta.env.BASE_URL`.
- Déclaration CSS conservée dans `src/vite-env.d.ts` pour compatibilité.

## 0.6.dev49
- Correction globale des chemins d’assets pour GitHub Pages et les déploiements sous un sous-dossier comme `/GaiaRP/`.
- Ajout d’un résolveur central basé sur `import.meta.env.BASE_URL` pour les planètes, lunes, stations, avatars, vaisseaux et illustrations du Lore.
- Les deux décors CSS du vaisseau sont désormais gérés comme assets Vite afin de respecter automatiquement le chemin de base du déploiement.
- Ajout de `src/vite-env.d.ts` dans la version distribuée pour que le build TypeScript/Vite fonctionne aussi sur GitHub Actions.
- Aucun contenu de jeu ni placement de la carte n’a été modifié.

## 0.6.dev48
- Inversion des illustrations de panneau entre Station Hélios et Argos, comme demandé.
- Reprise du visuel de Starlight avec l’image validée, mieux intégrée au centre de la carte système.
- Starlight devient cliquable sur la carte système et affiche désormais sa propre fiche avec type, température et rayon.

## 0.6.dev47
- Correction de l’affichage du soleil de Starlight sur la carte système : image recentrée, agrandie et découpée proprement en cercle pour supprimer l’effet de carré noir.

## 0.6.dev46
- Intégration des nouveaux visuels de carte pour Argos, Station Hélios et Bastion Elysia dans le système Starlight.
- Remplacement du soleil stylisé de Starlight par l’illustration dédiée sur la carte système.
- Les panneaux détaillés des installations conservent leurs images existantes ; seuls les marqueurs de carte utilisent les nouveaux PNG.

# Changelog dev45

- La zone Lore remonte désormais automatiquement en haut lors de l’ouverture d’une nouvelle page, fiche ou vue de lecture.
- Le comportement est notamment appliqué aux fiches Archives, aux retours de fiche, aux changements Chronologie / Archives et aux autres sous-pages du Lore.
- Base : dev44.

# Changelog dev44

## Base
- Reprise propre depuis la dev41, sans réutiliser la branche cassée suivante.

## Lore > Histoire Galactique > Archives
- Ajout d’un panneau visuel dans la fiche d’archive.
- Intégration du portrait validé d’Elias Kern.
- Ajout d’un placeholder de "mode édition" pour préparer le futur module d’administration.
- Renommage de la catégorie "Institutions historiques" en "Institutions".
- Ajout des archives de test : Le Directoire, La Commission, Alecto.

## Factions > Humanis
- Remplacement du texte générique par un texte d’histoire/société de test basé sur tes consignes.

## Assets
- Ajout de /public/elias-kern-grand.png.
