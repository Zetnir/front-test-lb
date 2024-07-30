# Important : Explication des décisions

## Utilisation de Custom Hook

J'ai pris la décision d'utiliser des custom hook afin de mieux respecter le principe de Single Responsability dans les fichiers qui les utilisent ainsi que limiter la quantité de code dans mes différents composants ( Meilleur visibilité ).

  - useCustomMapData : permet de generer des SVGElements dans le DOM car le module que j'ai choisis pour generer la carte du Canada ne permet pas de rajouter des éléments enfants aux provinces (code de la province / données affiché), donc useCustomMapData permet de les rajouter après le rendu de la carte dans un useEffect.

  - useStatsTotal : permet d'avoir plusieurs informations de calcul dépendement du tableau de Stats qui est passé en paramètre. Mettre ces informations dans un custom hook permet de compartimenter les informations dans des variables simples d'accès et calculés qu'une seule fois. Si le tableau de Stats viens à changer les informations de calcul changeront aussi. Peu-être que ce hook aurait pû être compartimenter en différentes fonctions dans un service mais j'ai préféré faire un hook afin d'avoir moins de code dans mes composants.

## Ajout des services

J'ai ajoutés des services pour certaines fonctions qui étaient utilisés dans plusieurs de mes composants avec des options différentes. Il était plus interréssant de les regrouper dans un seul fichier afin d'éviter la duplication de code.

  - StatsExtraction : 
    - ExtractData : Permet d'acceder aux informations de "cases" ou "deaths" d'un tableau de Stats en fonction du DataSet
    - ExtractCumulativeData : Permet d'acceder aux informations de "cumulativeCases" ou "cumulativeDeaths" d'un tableau de Stats en fonction du DataSet

  - StatsArraySorting :
    - SortStatsArray : Retourne un tableau de Stats trier en fonction de la valeur de Sorting passé en paramètre 

## Stratégie de tests

Pour ma stratégie de test j'ai opté pour une approche où je vérifie que tout ce qui doit être rendu est rendu correctement. Chaque fichier possédant du html avec un minimum de logique est testé afin de vérifier que le composant est rendu correctement pour tous les cas possibles. Je n'ai délibérément pas tester certains éléments comme PageTitle ou MainNavLink, car selon moi sont des composants qui n'ont aucune raison de ne faire un rendu correct des informations qu'ils possèdent. Il n'y a pas de fichier de test pour les hooks car les informaitons retournés sont testés dans les composants qui les utilises.

## Ajout de la date dans RouteParams

Afin de pouvoir respecter la fonctionnalité de partage d'url avec les paramètres utilisés pour l'affichage des informations, j'ai décider de rajouter le paramètre "date" aux RouteParams afin de pouvoir changer et détecter la date utilisé pour les requêtes des Stats avec l'url donnée. L'utilisation de recoil seule n'étais pas suffisante car l'information devait être gardé dans l'url mais couplé avec les paramètres de routage j'ai pu faire la détection/modification de la date à travers le calendrier.

## Modules utilisés

Pour la réalisation de ce test, j'ai utilisé différents modules pour faciliter le développement
  - axios pour realiser les requêtes https
  - react-canada-map pour generer une carte du canada interactive
  - react-calendar pour creer un popup de calendrier pour changer la date choisit
  - react-loader-spinner pour avoir un composant de chargement animé qui est affiché lors du chargement des données

Certains de ces modules sont mappé ou ignorer par jest dans package.json afin de pouvoir réaliser les tests sur les composants

# Évaluation technique frontale

## Énoncé

L’objectif de ce test est d’évaluer vos aptitudes techniques de développement front-end dans leur ensemble en vous demandant de produire une SPA qui consomme un API.

Vous utiliserez l’API [OpenCovid.ca](https://OpenCovid.ca) ainsi que le fichier Figma `evaluation_technique_frontale.fig` se trouvant dans le dossier `_mock`.

> Pour ouvrir le fichier, installez [Figma](https://www.figma.com/downloads/) et glissez le fichier sur la fenêtre Dashboard ou utiliser la commande `Import`.

## Récits utilisateur

Votre SPA doit respecter les fonctionnalités suivantes :

- En tant qu’utilisateur, je peux consulter les nouveaux cas ou les décès (de la dernière journée disponible) par province
- En tant qu’utilisateur, je peux partager un lien permettant de consulter les données selon les paramètres que j’ai choisis

### Fonctionnalités à implémenter :

#### Vue en tableau
   - En tant qu’utilisateur, je peux consulter les données dans un tableau textuel, incluant le total pour l’ensemble du Canada
   - En tant qu’utilisateur, je peux choisir l’ordre d’affichage des données selon une ou l’autre des colonnes du tableau (si choisi)

ou/et

#### Vue par carte
   - En tant qu’utilisateur, je peux consulter les données géographiquement dans une carte du Canada
   - En tant qu’utilisateur, je peux identifier rapidement les provinces durement touchées selon l’intensité de la couleur rouge

### Fonctionnalité optionnelle :

   - En tant qu’utilisateur, je peux consulter une date spécifique depuis le début de la pandémie

---

## Choix technologiques

- Un projet de base est fourni, celui-ci a été démarré en utilisant `create-react-app` en TypeScript, ainsi que `tailwindcss` et `recoil`
- Vous êtes libre d’utiliser toute librairie qui vous semble pertinente à la réalisation de la tâche.

## Points importants

- N’hésitez pas à produire un `README.md` pour vous assurer que nous pouvons comprendre vos décisions.
- Il est de votre responsabilité de clarifier les points qui ne sont pas évidents en nous posant des questions.
- Il n’est pas primordial d’implémenter toutes les fonctionnalités, l’important est d’aller le plus loin possible avec le temps alloué. La qualité est plus importante à nos yeux que la quantité.
- Bien sûr, on vise toujours à développer des applications _responsive_ adaptées à différentes utilisations. Les approches et techniques en ce sens pourront certainement être abordées dans notre rencontre de revue. Par contre, dans le cadre de cet exercice, tu peux te concentrer sur un viewport desktop sans problème.

## Évaluation

- Nous nous attendons que les règles de l’art du génie logiciel soient respectées.
- Critères d’évaluation
  - Le respect des besoins du client
  - L’architecture de la solution
  - La bonne utilisation des concepts du paradigme de programmation choisi
  - Les tests automatisés
  - Les standards de qualité du _Clean Code_

## Livraison

Nous vous demandons de partager votre travail dans une PR sur ce projet.

---

# Installation :

```shell
yarn install
```

## Pour consulter :

```shell
yarn start
```

## Pour rouler les tests :

```shell
yarn test
```
