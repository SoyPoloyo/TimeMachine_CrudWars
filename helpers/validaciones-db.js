const  Evento   = require('../models/evento');

const existeEventoID = async (id) => {
   
    const existeEvento = await Evento.findById(id);
    if (!existeEvento) {
        throw new Error(`El ID '${id}' no existe`)
    }
}

const coleccionesPermitidas = async (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida -  ${colecciones}`)
    }

    return true
}

module.exports = {
    existeEventoID,
    coleccionesPermitidas

}