import chalk from "chalk"; // const chalk = require("chalk");
import express from "express";//const express = require("express");
import fs from "fs";


const app = express();
const port = 3000;

const users = JSON.parse(fs.readFileSync("users.json"));

app.use(express.json()); // para leer req.body 

app.get('/', (req,res)=>{
    console.log(chalk.yellow("solicitud a /"));
    res.send("<h2> Hola desde el servidor</h2>");
})
app.get('/home', (req,res)=>{
    res.status(404).send("<h3> No encontrado</h3>");
})
app.get('/products', (req,res)=>{
    res.send([{"name":"prod1", "costo":234}])
})
app.get("/users", (req,res)=>{
    let {nombre, correo} = req.query;
    let filtrados = users.slice();
    if( nombre ){
        filtrados = filtrados.filter(usr => usr.username.toUpperCase().includes(nombre.toUpperCase()))
    }
    if (correo){
        filtrados = filtrados.filter(usr => usr.email.toUpperCase().includes(correo.toUpperCase()))
    }
    res.send(filtrados)
})

app.get('/users/:username', (req,res)=>{
    let user = users.find(usr => usr.username == req.params.username)
    if( user){
        res.send(user)
    }else{
        res.status(404).send({error: "usuario no encontrado"})
    }
})

app.post('/users', (req, res)=>{
    console.log(req.body);
    res.send("test")
})




app.listen(port, ()=>console.log("App listening on port "+ port))


// console.log(chalk.green("hola"));
// console.log(chalk.blue('Hello world!'));
// console.log(chalk.green(
// 	'I am a green line ' +
// 	chalk.blue.underline.bold('with a blue substring') +
// 	' that becomes green again!'
// ));
