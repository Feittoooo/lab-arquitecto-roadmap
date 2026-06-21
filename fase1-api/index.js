require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./services/db');
const { conectarProducer } = require('./services/kafka');
const notasRoutes = require('./routes/notas.routes');
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(notasRoutes);
 
async function start() {
  await connect();
  await conectarProducer();
  app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
  });
}
 
start();