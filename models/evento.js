const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    pais: {
        type: String
    },
    ciudad: {
        type: String
    },
    fecha: {
        type: Date
    },
    personajes: {
        type: [
            {
                nombre: { type: String },
                img: { type: String }
            }
        ]
    },
    img: {
        type: String,
    }

});

EventoSchema.methods.toJSON = function (params) {
    const { __v, _id, ...evento } = this.toObject();
    evento.uid = _id;
    return evento
}



module.exports = model('Evento', EventoSchema);


