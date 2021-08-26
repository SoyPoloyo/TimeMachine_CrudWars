const { response } = require('express');

const Evento = require('../models/evento');

const eventoGet = async (req, res) => {

    const { id } = req.params;

    const evento = await Evento.find({ nombre: { $elemMatch: { _id: id } } });

    res.json({
        msg: 'Evento encontrado',
        evento
    })
}

const eventosGet = async (req, res = response) => {

    let { desde = 0, limite = 5 } = req.query;

    isNaN(limite) ? limite = 5 : limite = (Number(limite));
    isNaN(desde) ? desde = 0 : desde = (Number(desde));



    // usamos Promise.all para ejecutar todas las promesas al mismo tiempo y reducir los tiempos de espera
    // y una desestructuracion de arreglos ya que nos devuelve un arreglo con las respuestas
    const [total, eventos] = await Promise.all([

        Evento.countDocuments(),

        Evento.find()
            /* .skip(desde)
            .limit(limite) // limita los usuarios mostrados */

    ])



    res.json({
        Info: `Eventos totales guardados: ${total}, Mostrando del: ${desde} al ${desde + limite}`,
        eventos,
      

    });
}

const eventosPut = async (req, res) => {
    // los params vienen en el url y son obligatorios, deben declararse en la ruta
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const evento = await Evento.findOneAndUpdate(id, resto);

    res.json({
        msg: 'Evento modificado',
        evento
    })
}

const eventosPost = async (req, res) => {

    const evento = req.body;
   
    const eventos = new Evento(evento);

    //El ya se reviso antes de llegar aqui la informacion, es valido y no existe en la DB

    //Guardamos en la base de datos
    await eventos.save();

    res.json({
        msg: 'Evento creado?',
        eventos
    })
}

const eventosDelete = async (req, res) => {
    const { id } = req.params;
    const evento = await Evento.findByIdAndDelete(id);
    res.json({
        msg: 'Evento borrado',
        evento
    })
}

module.exports = {
    eventosGet,
    eventosPut,
    eventosPost,
    eventosDelete
}