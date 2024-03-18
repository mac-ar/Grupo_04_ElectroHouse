const express = require('express');
const router = express.Router();
const productoApiController = require('../../controllers/API/productoApiControler');

//Rutas

router.get('/', productoApiController.list);
//Detalle de un ambum en base a un artista indicado
router.get('/:id', productoApiController.detail);

module.exports = router;