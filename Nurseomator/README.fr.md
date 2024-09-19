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

git clone repo

In your IDE, add you env variable:
In backend folder:

- Dupplicate the .env.sample file and rename it .env
- Modify thoses values: DATABASE_URL, JWT_SECRET, ENCRYPTION_KEY

In nurseomator-app folder:

- Dupplicate the .env.sample file and rename it .env
- Modify thoses values: EXPO_PUBLIC_API_URL

In docker folder:

- Dupplicate the .env.sample file and rename it .env
- Modify thoses values: PROJECT_PATH, MY_IP_URL
- Based on your OS, modify the volumes path in docker-compose.yml

In your terminal, go to docker folder: cd gom-jabbar/Nursomator/docker
Start containers: run docker compose up -d
Import db:

- Go to Nurseomator/backend/src/config
- Run: docker cp nursomator-db.sql your_container_name:/data.sql

docker-compose exec frontend npm start -- --host lan

Start the backend: docker-compose exec backend npm run dev
Start the frontend: docker-compose exec frontend npm start

To stop containers: docker compose down
