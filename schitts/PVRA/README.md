# Démarrer le projet


## API
1. Avoir Docker installé et en marche
2. Changer de directory dans le projet API`cd schitts/PVRA/api`
3. Installer les dépendances `npm i`
4. Démarrer les containers API et DB `docker-compose up --build -d`
   - Autre option: démarrer un seul container ou séparément :
        1. API `docker-compose up api-pvra --build -d`
        2. DB `docker-compose up postgres --build -d`
5. Fermer le tout `docker-compose down`

Pour démarrer en mode dev (hot reload)
1. Démarrer container DB (étape 4B)
2. Exécuter commande `npm start`

Pour exécuter les tests
1. S'assurer que la database est vide (voir section modifications)
2. Exécuter commande `npm test` dans `/web` avec container DB en marche

## Web app
1. Changer de directory dans le projet web `cd schitts/PVRA/web`
2. Installer les dépendances `npm i`
3. Démarrer l'app `npm run dev`
4. Ouvrir page dans un navigateur http://localhost:5173/

### Pour insérer 10 000 clients ayant 2 à 14 commandes
- Exécuter commande `npm run seed:big` dans `/web` avec container DB en marche

---

### Ports utilisés
- `8080`: API
- `5432`: DB
- `5173`: Web app

---

### [Plan du projet](https://excalidraw.com/#room=375520f3973583f9aa37,sF9NEHswPN8VXG3trrWeHg)
### [Schéma de la DB](https://drawsql.app/teams/im-cool/diagrams/rose-apothecary)

---

## Modifications à apporter ou manques
### Côté API
- Vider la database avant d'exécuter les tests
- Ajouter des messages d'erreur sur bad requests
- Modifier le nom des paramètres qui sortent de l'API pour éviter de 'bleed' les noms de la database
- Ajouter validation sur données entrantes dans le core

### Côté web
- 'Beautify' app
- Ajouter des pages pour les commandes et les retours
- Devrait avoir un vrai header dans les pages clients/produits, sans réutiliser le même component
- Mettre type client dans un useContext pour éviter du code dupliqué
- Ajouter tests UI (components, mock, ...)
- Uniformiser la langue, fichiers et fonctions (`AjouterProduits.jsx` -> `AddProduct.jsx`)
- Boutons 'retour' qui retournent à la dernière page au lieu de rediriger à la page principale
- Combiner pages `AjouterProduit.jsx` et `ModifierProduit.jsx` (beaucoup de code dupliqué)
- Ajouter redirect sur page produits/clients quand on clique sur ajouter (pages `AjouterProduit.jsx` et `AjouterClient.jsx`)

