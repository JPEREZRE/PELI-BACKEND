const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

// Listar tipos
router.get('/',  [validarJWT, validarRolAdmin], async function (req, res) {
    
    try {

        const tipos = await Tipo.find(); // select * from tipos
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    
  });

  // POST method route
router.post('/', [validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipo')
        
    }
    
  });

  // PUT method route
router.put('/:tipoId', [validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        console.log(req.params.tipoId);
        let tipo = await Tipo.findById(req.params.tipoId);
        
        if (!tipo) {
            return res.status(400).send('tipo no existe');
        }

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipo')
        
    }
    
  });
  
  module.exports = router;