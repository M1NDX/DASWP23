const {mongoose} = require('./connectdb')
const { nanoid} = require('nanoid')

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
    }
})

let User = mongoose.model('user',userSchema)

async function getUsers(filtros={}, isAdmin=false){
    let projection = {_id:0, username:1, email:1}
    if (isAdmin) projection.password = 1
    let docs = await User.find(filtros, projection)
    console.log(docs);
}

getUsers({},true)

async function addUser(newUser){
    //aquí podemos validar el newUser

    let newUserDB = User(newUser)
    await newUserDB.save()
    getUsers()
}



async function getUserByEmail(email){
    let doc = await User.findOne({email},{
        _id:0, email:1, username:1
    })
    console.log(doc);
    return doc
}

async function updateUser(email, userData){
    let newUser = await User.findOneAndUpdate( {email}, {$set: userData}, {new :true})
    console.log(newUser);
}

// updateUser("test3@test.com", {username:"test33333", password:"54321"})
// getUserByEmail("test3@test.com")

//  getUsers({email:'test3@test.com'})
// getUsers({username: new RegExp('TEST','i')})
// addUser({
//     email:"test3@test.com",
//  username:"test3",
//   password:"12345"
// })

module.exports = {User}
