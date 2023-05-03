const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

function validarBodyTarea(req, res, next) {
    let {titulo, descripcion, fechaLimite, completado} = req.body;
    if(titulo && descripcion && fechaLimite && completado!==undefined) {
        next();
        return; 
    }  

    res.status(400).send({error: "Faltan atributos, favor de revisar"})
}

function validarToken(req, res, next) {
    let token = req.get('x-token');

    if(!token) {
        res.status(401).send({error: "No autenticado"})
        return;
    }

    jwt.verify(token, config.jwtSecret, (err, decoded)=>{
        if(err) {
            res.status(401).send({error: err.message});
            return;
        }

        req.email = decoded.email;
        next();
    })

}

module.exports = {validarBodyTarea, validarToken}