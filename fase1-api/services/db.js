const { MongoClient } = require('mongodb');
 
const client = new MongoClient(process.env.MONGO_URI);
let db;
 
async function connect() {
  await client.connect();
  db = client.db('labdb');
  console.log('Conectado a MongoDB');
  return db;
}
 
function getDb() {
  if (!db) {
    throw new Error('La base de datos aún no está conectada. Llama a connect() primero.');
  }
  return db;
}
 
module.exports = { connect, getDb };