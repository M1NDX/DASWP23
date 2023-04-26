function validarBodyTarea(req, res, next) {
    let {titulo, descripcion, fechaLimite, completado} = req.body;
    if(titulo && descripcion && fechaLimite && completado!==undefined) {
        next();
        return; 
    }  

    res.status(400).send({error: "Faltan atributos, favor de revisar"})
}

module.exports = {validarBodyTarea}