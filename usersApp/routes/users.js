// USERS
const router = require('express').Router();
const {authStrict, validateAdmin} = require('../middlewares/auth')
const {User} = require('../db/User.js')
const users = require('../data/users.json');
const nanoid = require('nanoid');
const fs = require('fs');
const path = require('path')

console.log(nanoid.nanoid());

router.get('/',validateAdmin,async (req,res)=>{
    let isAdmin = req.isAdmin;
    let users  = await User.find({})
    let filtered = [...users]
    console.log(filtered);
    if(!isAdmin)
      filtered = filtered.map(usr => ({id: usr.id, username: usr.username,email:usr.email}))
    
    let {username, email} = req.query
    if(username) 
        filtered = filtered.filter(usr => usr.username
                                            .toUpperCase()
                                            .includes(username.toUpperCase()) )
    if(email) 
        filtered = filtered.filter(usr => usr.email.toUpperCase().includes(email.toUpperCase()) )
    
    res.send(filtered)
})



router.get('/:id', (req,res)=>{
    let user = users.find(usr => usr.id ==req.params.id )
    if(user){
        res.send(user)
    }else{
        res.status(404).send({error:"no existe usuario"})
    }
})


//NUNCA SERÁ ACCESIBLE porque ya existe un endpoint antes con /:id
router.get('/:test', (req, res) => {
    res.send({test: "hola"})
})

router.put('/:id',authStrict, (req,res)=>{

    let user = users.find(usr => usr.id ==req.params.id )
    if(user){
        let {username, email, password} = req.body;
        if(username) user.username = username;
        if(email) user.email = email;
        if(password) user.password = password;
        fs.writeFileSync(path.join('data','users.json'), JSON.stringify(users))
        res.send(user)

        // res.send(user)
    }else{
        res.status(404).send({error:"no existe usuario"})
    }
})

router.post('/',authStrict,(req,res)=>{
    //atributos username, email, password
    let {username, email, password} = req.body;
    let errores = []
    if(!username) errores.push("username")
    if(!email) errores.push("email")
    if(!password) errores.push("password")

    if(errores.length>0){
        res.status(400).send({errores})
        return;
    }

    let newUser = {id: nanoid.nanoid(),username,email,password}
    console.log(newUser);
    users.push(newUser);
    // fs.writeFileSync(path.resolve('./data','users.json'), JSON.stringify(users))
    fs.writeFileSync(path.join('data','users.json'), JSON.stringify(users))

    res.status(201).send(newUser)

})

router.delete('/:id',authStrict,(req,res)=>{
    let pos = users.findIndex(usr=> usr.id == req.params.id)
    if(pos==-1){
        res.status(404).send({error: "no se encontró usuario"})
        return;
    }

    let deleted =  users.splice(pos,1)
    fs.writeFileSync(path.join('data','users.json'), JSON.stringify(users))
    res.send({info: "usuario "+ deleted[0].username+ " ha sido borrado"})
})


module.exports = router;
// export default routes



