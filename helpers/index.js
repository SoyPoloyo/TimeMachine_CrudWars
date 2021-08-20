const validacionesDB = require('../helpers/validaciones-db');
const subirArchivo = require('./subir-archivo');

module.exports = {
  
    ...validacionesDB,
    ...subirArchivo
}
