const { Schema, model } = require('mongoose')
const bcrypt   = require('bcryptjs');


const UsuarioSchema = Schema({
    nombre: {type: String, required: true },
    email: { type: String, required: true, unique: true},
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo']},
    password: { type: String, required: true},
    rol: { type: String, required: true, enum: ['Administrador', 'Docente']},
    fechaCreacion: {type: Date, required: true },
    fechaActualizacion: { type: Date, required: true},
    
});

UsuarioSchema.pre('save', async function (next) {
    
    if (!this.isModified('password')) return next();

    try {
        
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});


UsuarioSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('Usuario', UsuarioSchema);