const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'fase1-api',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

async function conectarProducer() {
  await producer.connect();
  console.log('Producer de Kafka conectado');
}

async function publicarEvento(topic, mensaje) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(mensaje) }],
  });
}

module.exports = { kafka, conectarProducer, publicarEvento };