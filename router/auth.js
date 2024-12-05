const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');

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


     } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear usuario')

     }

  });

  module.exports = router;