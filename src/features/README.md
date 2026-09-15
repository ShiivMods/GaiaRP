# Fonctionnalités

Chaque dossier de `features/` regroupe désormais une partie fonctionnelle du site.

Règle de travail :

- les fichiers `*Data.ts` contiennent en priorité les données faciles à modifier ;
- les fichiers `*.tsx` contiennent l'affichage et les interactions ;
- éviter de remettre de grosses listes de données directement dans `App.tsx`.

`App.tsx` doit rester le coordinateur général de la navigation, pas redevenir le fichier unique de tout le projet.
