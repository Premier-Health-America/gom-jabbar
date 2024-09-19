# Processus de pensée

## Choix de la pile technique

### API

- **Node.js** avec **Express**
- DB: **PostgreSQL**

Pour hasher les mots de passe: **bcrypt**

Pour crypter et décrypter le dossier des patients: **crypto**

### Application Mobile

- **React Native** pour une application mobile cross-platform (iOS et Android). Développement + rapide.
- **Expo** : + rapide, sans avoir à se préoccuper des configurations de bases.

Pour la carte:

- **React Native Maps**
- API Google Maps

Pour les requêtes:

- **Axios**

# SetUp local du projet

## Git

git clone repo

## env variables

In backend folder:

- Dupplicate the .env.sample file and rename it .env
- Modify thoses values: DATABASE_URL, JWT_SECRET, ENCRYPTION_KEY

In nurseomator-app folder:

- Dupplicate the .env.sample file and rename it .env
- Modify thoses values: EXPO_PUBLIC_API_URL

## Database

In your terminal, go to config folder: cd gom-jabbar/Nursomator/config

Run psql -U julietteguilbaud -d nurseomator -f init-db.sql

## Start

Start the backend:

Got to cd gom-jabbar/Nursomator/backend

Run npm install

Run npm run dev

Start the frontend:

Got to cd gom-jabbar/Nursomator/nurseomator-app

Run npm install

Run npm start
