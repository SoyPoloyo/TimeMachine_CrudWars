const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const Evento = require('../models/evento');

const buscar = async (req, res = response) => {

    const { termino } = req.params;

    //  if (!coleccionesPermitidas.includes(coleccion)) {
    //     return res.status(400).json({
    //         msg: `EL parametro ${coleccion} no se encuentra entre los permitidos: ${coleccionesPermitidas} :`
    //     })
    // }

    //const esMongoId = ObjectId.isValid(termino); //TRUE
    const esMongoId = isValidObjectId(termino);

    if (esMongoId) {

        const evento = await Evento.findById(termino);

      

        if (evento.length === 0) {
            return res.status(404).json({
                Result: 'No se encontraron resultados'
            })
        }
        return res.json(
            (evento) ? evento : []
        )
      

    }

    const regex = new RegExp(termino, 'i'); // para que sea insensible a mayuscula o minusculas

    const eventos = await Evento.find({ //.count para contar respuestas*
        $or: [{ nombre: regex }, { pais: regex}], //{$elemMatch:{ NOMBRE: regex }} 
    }); 

    if (eventos.length === 0) {
        return res.status(404).json({
            Result: 'No se encontraron resultados'
        })
    }
    res.json(eventos);
}



module.exports = {
    buscar
}