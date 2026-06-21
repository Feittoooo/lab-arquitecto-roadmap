require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const client = new MongoClient(process.env.MONGO_URI);
let db;

async function start(){
    await client.connect();
    db = client.db('labdb');
    console.log('Conectado a MongoDB');

    app.listen(process.env.PORT , () => {
        console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
    });
}

app.post('/notas', async (req, res) => {
    try{
        const nota = req.body;
        const resultado = await db.collection('notas').insertOne(nota);
        res.status(201).json({id: resultado.insertedId, ...nota });
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'No se pudo guardar la nota'});
    }
});

app.get('/notas', async (req, res) => {
    try {
        const notas = await db.collection('notas').find().toArray();
        res.json(notas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudieron obtener las notas' });
  }
});

app.patch('/notas/:id', async (req, res) => {
    try{
        const resultado = await db.collection('notas').updateOne({_id: new ObjectId(req.params.id)}, {$set: {completado: req.body.completado}});
        res.status(200).json({id: resultado.modifiedCount});
        console.log(res.json())
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'No se pudo actualizar la nota'});
    }
});

app.delete('/notas/:id', async (req, res) => {
    try{
        const resultado = await db.collection('notas').deleteOne({_id: new ObjectId(req.params.id)});
        res.status(200).json({id: resultado.deletedCount});
        console.log(res.json())
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'No se pudo borrar la nota'});
    }
});
start();