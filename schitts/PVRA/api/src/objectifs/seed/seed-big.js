import database from '../../database/database.js'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const getRandomDateWithinLastTwoYears = () => {
  // Pas vraiment random
  const currentYear = new Date().getFullYear()
  return new Date(getRandomInt(currentYear - 2, currentYear), getRandomInt(1, 12), getRandomInt(1, 28))
}

const insertTestProuit = async () => {
  return await db.query(`INSERT INTO produits (nom, prix, flair, dernier_reapprovisionnement, duree_conservation)
                         VALUES ('testProduit', 5, 7, '2024-4-17', 14)`)
}

const insertTestClient = async () => {
  return await db.query(`INSERT INTO clients (nom, type, parfum_prefere_id, produit_prefere_id)
                         VALUES ('testClient', 1, null, null)`)
}

const getLargestProduitId = async () => {
  await insertTestProuit()
  const produitIds = await db.query(`SELECT id
                                     FROM produits`)

  return produitIds.rows[0].id
}

const getLargestClientId = async () => {
  const clientIds = await db.query(`SELECT id
                                    FROM clients`)

  let largestClientId = 1

  if (clientIds.rows !== []) {
    clientIds.rows.forEach((id) => {
      if (id.id > largestClientId) {
        largestClientId = parseInt(id.id)
      }
    })
  }
  return largestClientId
}

const getClientString = (i) => {
  return `('TestClient${i + nextClientId}', ${getRandomInt(1, 3)}, null, null)`
}

const getCommandeString = (i) => {
  return `(\'${getRandomDateWithinLastTwoYears().toISOString()}\', ${nextProduitId}, ${nextClientId + i}, ${getRandomInt(1, 10)}, ${getRandomInt(1, 5)}, ${getRandomInt(1, 2)})`
}

const db = database('localhost')

let clients = []
let commandes = []

await insertTestClient() // Pour cas spécifique si des clients ont été supprimés

const nextProduitId = await getLargestProduitId()
const nextClientId = parseInt(await getLargestClientId()) + 1

for (let i = 0; i < 10000; i++) {
  clients.push(getClientString(i))

  for (let j = 0; j < getRandomInt(2, 14); j++) {
    commandes.push(getCommandeString(i))
  }
}

const clientString = clients.join(',')
const commandeString = commandes.join(',')

console.time('seed')

await db.query(`INSERT INTO clients (nom, type, parfum_prefere_id, produit_prefere_id)
                VALUES ${clientString}`)
await db.query(`INSERT INTO commandes (date, produit_id, client_id, humeur, nombre_clients, repartition_addition)
                VALUES ${commandeString}`)

console.timeEnd('seed')

process.exit()
