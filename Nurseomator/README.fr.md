## [ENGLISH VERSION](README.md)

# Nurse-o-Mator

# Français

# Introduction

J'ai décidé de choisir "Nurse-o-Mator" comme mon projet pour l'entrevue/examen technique de PHA.

Premièrement, j'ai passé un bon moment et j'ai aimé apprendre de nouvelles technologies telles que React-Leaflet, Socket.io, et approfondir CORS. Je comprends maintenant son importance pour la sécurité.

Deuxièmement, j'ai commencé vendredi soir dernier lorsque j'ai reçu le dépôt GitHub de Bruno (Merci, Bruno !). Je voulais vous informer que mes deux autres emplois de developeur (à temps partiel) se sont terminés ce mois-ci (juin 2024) et j'ai dû retourner travailler comme électricien. Donc, tout en travaillant 40 heures par semaine, j'ai codé environ 30 heures supplémentaires, ce qui était incroyablement fatigant mais très agréable.

Si vous craignez que je doive donner mon préavis de deux semaines à mon patron actuel si j'obtiens cet emploi, ne vous inquiétez pas. Mon patron actuel est au courant de ma situation et m'encourage à continuer en tant de developeur, sachant que c'est mon emploi d'électricien est temporaire.

Troisièmement, je travaille généralement en tant que développeur web avec une base de données et des API RESTful utilisant la méthode CRUD. Lors de mes recherches de middleware, j'ai décidé d'utiliser React/JS pour le frontend et Node.js/Express.js pour le backend. Comme ce projet nécessitait des mises à jour en temps réel, j'ai rapidement réalisé que la méthode CRUD n'était pas adaptée, j'ai donc appris à utiliser Socket.IO. De plus, j'ai dû apprendre React-Leaflet, ce qui était simple.

Quatrièmement, ce projet n'était pas un environnement de développement web typique. J'ai écrit beaucoup de JavaScript, plus que jamais auparavant. Je ne suis pas un expert (pas encore!) en JavaScript, mais ce projet m'a beaucoup appris. GPT m'a aidé avec les directions et la proximité des objets, et j'ai beaucoup appris avec cette application. Excusez toute maladresse dans le backend. Il y a quelques problèmes aléatoires, comme des igloos qui se chevauchent ou des hôpitaux qui apparaissent trop près des igloos, mais cela fonctionne assez bien.

Cinquièmement, sur le frontend, je voulais créer différents "components" et les importer pour nettoyer app.js, mais je ne voulais pas risquer de casser l'application. Ce n'est pas ma façon habituelle de travailler, mais je voulais finir en une semaine. Toutes les valeurs sont stockées dans le backend et apparaissent sur le frontend via Socket.IO.

Sixièmement, tout est écrit en anglais. Il est beaucoup plus facile pour moi de travailler et de rechercher des choses en anglais, donc toutes mes notes sont en anglais.

Septièmement, je voulais vraiment implémenter plus de fonctionnalités comme le Yeti ou la tempête de neige, mais j'ai pensé qu'après une semaine d'attente, Bruno pourrait penser que je ne faisais rien... Si je ne travaillais pas à plein temps, j'aurais certainement pu terminer le projet à 100 % dans cette semaine.

# Instructions d'installation

**Frontend:**

    cd nurseomator
    cd client
    yarn install

        Pour démarrer l'application React:
        yarn start

**Backend:**

    cd nurseomator
    cd server
    yarn install

        Pour démarrer le serveur Nodemon/Backend:
        yarn start

En cas de problèmes de port serveur, veuillez tuer les ports 3000 (frontend) et 8888 (Socket.IO/node).

# Explication de la simulation

En haut à gauche, le Scoreboard compte le nombre d'infirmières mortes (Dead Nurses) et de maisons guéries (Cured Houses).

La section "Alerts" fournit des mises à jour en temps réel sur les infirmières, y compris les décès et les guérisons.

L'écran principal est une carte du nord du Canada. La place ou que personnes veut vivre.

Cliquer sur une icône d'hôpital indique de quel hôpital il s'agit.

Cliquer sur une infirmière fournit des coordonnées en temps réel, le nombre de hot chocolates, le "Time Left" et l'inventaire.

Les infirmières errent sans but jusqu'à ce qu'elles trouvent un igloo malade, puis elles se rendent à l'hôpital pour un remède. Elles obtiennent du hot chocolate, le remède, et se dirigent vers l'igloo. Une fois guéri, l'icône de l'igloo change et l'infirmière obtient plus de hot chocolate du propriétaire.

Si une infirmière manque de hot chocolate, son avatar change pour indiquer qu'elle est sur le point de geler. Elles se précipitent à l'hôpital pour plus de hot chocolate.

Si une infirmière meurt, son avatar change en pierre tombale. RIP!!

Une fois que tous les igloos sont guéris, la simulation s'arrête, et vous pouvez la "Restart", ce qui redémarre tous les intervalles sur le backend.

La carte permet de cliquer et de faire glisser, mais le zoom est désactivé.

# Conclusion

J'ai adoré découvrir comment créer cette application. Je m'excuse pour la semaine que cela a pris, mais je devais travailler pour payer mes factures. Merci pour l'opportunité; ce fut une expérience d'apprentissage incroyable!

... ... La traduction a êtê traduit par GPT... C'est apparant hahaha...
