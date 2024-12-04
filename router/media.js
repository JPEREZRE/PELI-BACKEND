const { Router } = require('express');
const Media = require('..//models/Media')
const { validationResult, check } = require('express-validator')

const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),
    

], async function(req, res){

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeserial = await Media.findOne({ serial: req.body.serial });
        if (existeserial) {
            return res.status(400).send('Ya existe el serial')
        }

        let pelicula = new Media();
        pelicula.serial = req.body.serial;
        pelicula.titulo = req.body.titulo;
        pelicula.sinopsis = req.body.sinopsis;
        pelicula.url = req.body.url;
        pelicula.foto = req.body.foto;
        pelicula.añoEstreno = req.body.añoEstreno;
        pelicula.director = req.body.director._id;
        pelicula.productora = req.body.productora._id;
        pelicula.genero = req.body.genero._id;
        pelicula.tipo = req.body.tipo._id;
        pelicula.fechaCreacion = new Date();
        pelicula.fechaActualizacion = new Date();

        pelicula = await pelicula.save();
        res.send(pelicula);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear pelicula');
        
    }
})


// Listar peliculas
router.get('/', async function (req, res) {
    
    try {

        const peliculas = await Media.find().populate([
            {
                path: 'director', select: 'nombre estado'
            },
            {
                path: 'productora', select: 'nombre estado'
            },
            {
                path: 'genero', select: 'nombre estado'
            },
            {
                path: 'tipo', select: 'nombre estado'
            }

        ]);

        res.send(peliculas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    
  });

  router.put('/:peliculaId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),

], async function(req, res){

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let pelicula = await Media.findById(req.params.peliculaId);
        if (!pelicula) {
            return res.status(400).sed('Media no existe')
        }

        const existeserial = await Media.findOne({ serial: req.body.serial, _id:{ $ne: pelicula._id} });
        if (existeserial) {
            return res.status(400).send('Ya existe el serial ')
        }


        pelicula.serial = req.body.serial;
        pelicula.titulo = req.body.titulo;
        pelicula.sinopsis = req.body.sinopsis;
        pelicula.url = req.body.url;
        pelicula.foto = req.body.foto;
        pelicula.añoEstreno = req.body.añoEstreno;
        pelicula.director = req.body.director._id;
        pelicula.productora = req.body.productora._id;
        pelicula.genero = req.body.genero._id;
        pelicula.tipo = req.body.tipo._id;
        pelicula.fechaCreacion = new Date();
        pelicula.fechaActualizacion = new Date();

        pelicula = await pelicula.save();
        res.send(pelicula);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar pelicula');
        
    }
})


module.exports = router