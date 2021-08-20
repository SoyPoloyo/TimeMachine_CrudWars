
const { Router } = require('express');
const { check } = require('express-validator');

const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivo } = require('../middlewares');

const { mostrarImagen, actualizarImgCloudinary } = require('../controllers/updloads');


const router = Router();


router.put('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, [ 'eventos', 'char1', 'char2'])),
    validarArchivo,
    validarCampos
], actualizarImgCloudinary) //cloudinry
//], actualizarImg) // servidor local

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, [ 'eventos'])),
    validarCampos
], mostrarImagen)

module.exports = router;