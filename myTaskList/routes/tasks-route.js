const router = require('express').Router();
const {Tarea} = require('../db/Tarea.js');

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

module.exports = router;