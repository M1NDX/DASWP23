import { Router } from "express";// const router = require("express").Router();

const router = new Router();

router.get('/', (req, res) => { 
    res.send({info: "hola"})
})

export default router; //module.exports = router
//module.exports = router

