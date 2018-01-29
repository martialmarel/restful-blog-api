Hello,

The Github link to the project is https://github.com/martialmarel/restful-blog-api

The architecture of the project is as follows:

    .
    ├── controllers
    │ ├── commentController.js
    │ └── postController.js
    ├── data
    │ └── store.js
    ├── helpers
    │ └── uptime.js
    ├── roads
    │ ├── comments.js
    │ ├── index.js
    │ └── posts.js
    ├── server.js
    └── test
        ├── comment.js
        ├── curl.sh
        └── post.js


The store is locate in the data folder.
I created a module "uptime.js" to track the start time of the Node process. I put it in the "helpers" folder.
That i wired on the route "/". When this route is requested, the returned response contains two keys: the last time the Express.js server was started, and the current time at the now of the request is trigged.

First time i launch manually the CURL commands found in the test/curl.sh file.
I try to implement set up automated tests.
For that i used "Mocha" a launch runner the tests.
For the library of assertions, I used "Chai" by privileging the use of the function "expect" instead of "should". Because which alters each object by adding to the prototype the function should.
Since this is a tested REST API, I used chai-http as a complement.

Eslint has been added in order to have a code written in a uniform way.

The project expose the different commands:

   - npm run dev: launches nodemon and starts the express server
   - npm run test: run the test suite
   - npm run lint: runs the syntax check on JS files, to validate their compliance with the standard defined in the .eslintrc.json file

The stuturation of the route files is as follows.
The routes / index.js file will load the posts.js file containing routes matching the '/posts' pattern.

For each HTTP method (GET, POST, PUT, DELETE) a route will be declared and linked to the corresponding function of the controller postController.js
I create and exploit my custom middleware allowed to share the test function if the post exists for the PUT and DELETTE methods, and if necessary returned an error with the correct HTTP code and message.

It is also from the posts.js file, which is loaded the comment.js file containing the routes answering the pattern '/posts/:postId/comments'.
In this case we are dealing with a nested route mechanism.

In order to be able to read the parameter :postId from the router comments.js, it is necessary to specify in constructor of the router mergeParams: true. This was the difficulty encountered on this project.

Hoping to have been clear in my explanations, I would answer with pleasure all the questions.

-----------------------------------------

Bonjour,

Le lien Github vers le projet https://github.com/martialmarel/restful-blog-api

L'architecture du projet est la suivante :

    .
    ├── controllers
    │   ├── commentController.js
    │   └── postController.js
    ├── data
    │   └── store.js
    ├── helpers
    │   └── uptime.js
    ├── routes
    │   ├── comments.js
    │   ├── index.js
    │   └── posts.js
    ├── server.js
    └── test
        ├── comment.js
        ├── curl.sh
        └── post.js


Le store est rangé dans le dossier data.
J'ai créé un module "uptime.js" de suivi du temps de démarrage du processus Node. Je l'ai rangé dans le dossier "helpers".
Que j'ai câblé sur la route "/". Quand on requête cette route, la réponse retournée contient deux clés : le temps du dernier démarrage du serveur express.js, et le temps courant au moment de la requête.

Au départ j'exécutai les commandes CURL qui se trouvent dans le fichier test/curl.sh
Et puis j'ai été tenté de mettre en place des tests automatisés.
Pour cela j'ai utilisé "Mocha" pour lancer les tests.
Pour la librairie d'assertions, j'ai utilisé "Chai" en privilégiant l'usage de la fonction "expect" au lieu de "should » qui altère chaque objet en ajoutant au prototype la fonction should.
S’agissant d'une API REST à testé, j'ai donc utilisée en complément chai-http.

Eslint a été ajouté afin d'avoir un code écrit de manière uniforme.

Le projet propose les différentes commandes :

   - npm run dev : lance nodemon et démarre le serveur express
   - npm run test : lance l'exécution de la suite de tests
   - npm run lint : exécute le contrôle de syntaxe sur les fichiers JS, afin de valider leur conformité au standard définit dans le fichier .eslintrc.json

La stuturaction des fichiers de routes est la suivante.
Le fichier routes/index.js va charger le fichier posts.js contenant les routes répondant au motif '/posts'.

Pour chaque méthode HTTP (GET, POST, PUT, DELETE) une route va être déclarée et liée à la fonction correspondante du controller postController.js
La création et l'utilisation de middleware personnalisé à permis de mutualisées la fonction de test si le post existe pour les méthode PUT et DELETTE, et le cas échéant retourné une erreur avec le bon code HTTP et un message.

C'est également depuis le fichier posts.js, qu'est chargé le fichier comment.js contenant les routes répondant au motif '/posts/:postId/comments'.
Dans ce cas nous sommes en présence d'un mécanisme de routes imbriquées.

Afin de pouvoir lire le paramètre :postId depuis le router comments.js, il est nécessaire de spécifier en paramètre du router mergeParams: true. Ce fut la difficulté rencontrée sur ce projet.

Espérant avoir été clair dans mes explications, je répondrais avec plaisir à toutes les questions.