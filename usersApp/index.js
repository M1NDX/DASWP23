const express = require('express');
const userRoute = require('./routes/users');
const cors = require('cors');
const path = require('path');
const logs = require('./middlewares/log')
const {log, info} = require('./middlewares/log')
const app = express();
const port = 3001;

app.use(logs.log)
app.use(info)
app.use(cors());    
app.use(express.json()); //req.body
console.log(__dirname);
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/public/html')))
// app.use('/usuarios',express.static(path.join(__dirname, '/public/html/usuarios')))
app.get('/',(req,res)=>{
    res.send({info:"ok"})
})
app.use('/api/users', userRoute);

app.listen(port, () => console.log(`running  http://localhost:${port}`) )


