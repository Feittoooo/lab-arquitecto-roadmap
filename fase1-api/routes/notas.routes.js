const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notas.controller');
 
router.post('/notas', notasController.crearNota);
router.get('/notas', notasController.listarNotas);
router.patch('/notas/:id', notasController.actualizarNota);
router.delete('/notas/:id', notasController.borrarNota);
 
module.exports = router;