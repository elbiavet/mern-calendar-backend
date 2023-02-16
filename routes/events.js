/*  Rutas de Eventos 
    host + /api/events */

const { Router } = require("express")
const router = Router();
const { validarJWT } = require('../middewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require("express-validator");
const { validarCampos } = require("../middewares/validar-campos");
const { isDate } = require("../helpers/isDate");



//Todas las rutas tienen que pasar por la validacion del JWT
router.use( validarJWT );

//obtener eventos
router.get('/', getEventos)

//crear un nuevo evento
router.post(   
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(), 
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ), 
        check('end', 'La fecha de fin es obligatoria').custom( isDate ), 
        validarCampos
    ],
    crearEvento)

//actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(), 
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ), 
        check('end', 'La fecha de fin es obligatoria').custom( isDate ), 
        validarCampos
    ], 
    actualizarEvento)

//borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;