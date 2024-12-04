const { Schema, model } = require('mongoose');
const Productora = require('./Productora');


const MediaSchema = Schema({
     serial: {type: String, required: true, unique: true },
     titulo: { type: String, required: true},
     sinopsis: { type: String, required: true},
     url: { type: String, required: true},
     foto: { type: String, required: true},
     añoEstreno: { type: String, required: true},
     director: { type: Schema.Types.ObjectId, ref: 'Director', required: false},
     productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
     genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true},
     tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
     fechaCreacion: {type: Date, required: true },
     fechaActualizacion: { type: Date, required: true},

});

module.exports = model('Media', MediaSchema);