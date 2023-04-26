const { mongo } = require('mongoose');
const {mongoose} = require('./connectdb.js');

const taskSchema = mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaLimite: {
        type: Number,
        required: true
    },
    completado:{
        type: Boolean,
        default: false,
        required: true
    }
})

taskSchema.statics.getTareas = async(filtros)=>{
    let docs = await Tarea.find(filtros)
    console.log(docs);
    return docs;
}


taskSchema.statics.getTareaById= async(uid) => {
    let doc = await Tarea.findOne({uid})
    console.log(doc);
    return doc
}

taskSchema.statics.crearTarea = async(datosTarea)=>{
    let newTarea = Tarea(datosTarea)
    return await newTarea.save()
}

taskSchema.statics.actualizarTarea = async(uid, datosTarea)=>{
    let updatedTask = await Tarea.findOneAndUpdate({uid},{$set: datosTarea},{new:true})
    return updatedTask;
}

taskSchema.statics.borrarTarea= async(uid) => {
    let doc = await Tarea.findOneAndDelete({uid})
    console.log(doc);
    return doc
}

const Tarea  = mongoose.model('Tarea', taskSchema)

// Tarea.crearTarea({uid:"1234",
//                              titulo: "Entrega de avance proyecto DASW",
//                              descripcion:"DASW",
//                              fechaLimite:20230424})
//Tarea.getTareas()
Tarea.getTareaById('1234')

module.exports = {Tarea}