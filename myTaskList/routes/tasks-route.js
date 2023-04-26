const router = require('express').Router();
const {Tarea} = require('../db/Tarea.js');

router.get('/',async (req,res)=>{
    let tasks = await Tarea.getTareas()
    res.send(tasks)
})

module.exports = router;