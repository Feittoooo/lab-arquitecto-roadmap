const { ObjectId } = require('mongodb');
const { getDb } = require('../db');
 
async function crearNota(req, res) {
  try {
    const nota = req.body;
    const resultado = await getDb().collection('notas').insertOne(nota);
    res.status(201).json({ id: resultado.insertedId, ...nota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo guardar la nota' });
  }
}
 
async function listarNotas(req, res) {
  try {
    const notas = await getDb().collection('notas').find().toArray();
    res.json(notas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudieron obtener las notas' });
  }
}
 
async function actualizarNota(req, res) {
  try {
    const resultado = await getDb()
      .collection('notas')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { completado: req.body.completado } }
      );
    res.status(200).json({ modificados: resultado.modifiedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo actualizar la nota' });
  }
}
 
async function borrarNota(req, res) {
  try {
    const resultado = await getDb()
      .collection('notas')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({ borrados: resultado.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo borrar la nota' });
  }
}
 
module.exports = { crearNota, listarNotas, actualizarNota, borrarNota };