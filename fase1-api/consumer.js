require('dotenv').config();
const { kafka } = require('./services/kafka');

const consumer = kafka.consumer({ groupId: 'grupo-notificaciones' });

async function start() {
  await consumer.connect();
  console.log('Consumer conectado a Kafka');

  await consumer.subscribe({ topic: 'notas-creadas', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const nota = JSON.parse(message.value.toString());
      console.log(`Nueva nota detectada en el topic "${topic}":`);
      console.log(nota);
    },
  });
}

start();