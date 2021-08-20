
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const { existeEventoID } = require('../helpers/validaciones-db')

const { eventosGet, eventosPut, eventosPost, eventosDelete } = require('../controllers/eventos');

const router = Router();

router.get('/', eventosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEventoID),
    validarCampos
], eventosPut);

router.post('/', [
    check('nombre', 'Debe escribir el nombre de el evento').not().isEmpty(),
    check('descripcion', 'Debe escribir una descripcion de el evento').not().isEmpty(),
    validarCampos
],eventosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEventoID),
    validarCampos
], eventosDelete);

module.exports = router;