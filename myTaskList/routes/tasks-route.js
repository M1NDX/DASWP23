const router = require('express').Router();
const {validarBodyTarea} = require('../middlewares/validarDatos.js');
const {Tarea} = require('../db/Tarea.js');
const nanoid = require('nanoid')

router.get('/',async (req,res)=>{
    let filtro = {}
    let {titulo, descripcion, completado} = req.query;
    console.log("completado", completado);
    if(titulo) {
        filtro.titulo = new RegExp(titulo,'i'); //i = ignore case
    }
    if(descripcion) {
        filtro.descripcion = new RegExp(descripcion,'i'); 
    }
    if(completado!==undefined){
        filtro.completado = completado =="true"? true: false;
    }
    let tasks = await Tarea.getTareas(filtro)
    res.send(tasks)
})

router.post('/', validarBodyTarea, async (req, res) => {
    let {titulo, descripcion, fechaLimite,completado } = req.body;
    console.log(nanoid.nanoid());
    let newDoc = await Tarea.crearTarea({uid:nanoid.nanoid(),titulo, descripcion, fechaLimite,completado })
    res.status(201).send(newDoc)
})  

module.exports = router;