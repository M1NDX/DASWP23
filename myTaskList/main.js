const express = require('express')
const path = require('path')
const taskRouter = require('./routes/tasks-route.js')
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//midleware para leer el body en el post y put como req.body
app.use(express.json())

// rutas a tasks
app.use('/api/tasks',taskRouter)

app.listen(port, ()=>console.log("running on port"+ port))
