//unimos todos nuestros middlewares en un solo archivo

const validarCampos = require('../middlewares/validar-campos');
const existeArchivo = require('./validar-archivo')


module.exports = {
    ...validarCampos,
    ...existeArchivo

}
