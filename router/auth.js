const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT} = require('../helper/jwt');

const router = Router();

router.post('/', [
    check('email', 'invalid.email').isEmail(),   
    check('password', 'invalid.password').not().isEmpty(),     
],  async function (req, res) {
  
   try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({mensaje: errors.array()});
      }

      const usuario = await Usuario.findOne({ email: req.body.email})
      if (!usuario) {
        return res.status(400).send('usuario no encontrado')
      }

      const esIgual = bcrypt.compareSync(req.body.password, usuario.password);
      if (!esIgual) {
        return res.status(400).json({ mensaje: 'usuario no encontrado'});
       }

       const token = generarJWT(usuario);
       
       res.json({
        _id: usuario._id, nombre: usuario.nombre,
         rol: usuario.rol, email: usuario.email, access_token: token,

       })


     } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear usuario')

     }

  });

  module.exports = router;