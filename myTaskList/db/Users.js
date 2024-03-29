const {mongoose} = require('./connectdb')
const { nanoid} = require('nanoid')
const { Tarea } = require('./Tarea.js')

let userSchema =  mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,   
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tareas: [{type: mongoose.Schema.Types.ObjectId, ref:'Tarea' }]
})

//User.getUsers({},true)
userSchema.statics.getUsers =   async (filtros={}, isAdmin=false)=>{
    let projection = {_id:0, username:1, email:1}
    let skip=0
    let limit = 1000
    
    if (isAdmin) projection.password = 1
    let docs = await User.find(filtros, projection)
                        .populate({
                            path:'tareas',
                            model:'Tarea',
                            select:'uid titulo descripcion fechaLimite completado'})
    console.log(docs);
    console.log(JSON.stringify(docs));
    return docs;
}

userSchema.statics.getUserByEmail = async (email)=>{
    let doc = await User.findOne({email},{
        _id:0, email:1, username:1, password:1
    })
    console.log(doc);
    return doc
}

userSchema.statics.addUser = async (newUser)=>{
    //aquí podemos validar el newUser

    let newUserDB = User(newUser)
    await newUserDB.save()
    return newUserDB;

}

userSchema.statics.updateUser = async (email, userData)=>{
    let newUser = await User.findOneAndUpdate( {email}, {$set: userData}, {new :true})
    console.log(newUser);
    return newUser;
}

userSchema.methods.update = async function (userData){
    let data = await this.updateOne(userData)
    console.log("update", data);
    return this
}

userSchema.statics.deleteUser = async (email)=>{
    let doc = await User.findOneAndDelete({email})
    return doc;
}



let User = mongoose.model('user',userSchema)


User.getUsers({},true)

module.exports = {User}