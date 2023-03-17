const express = require('express');
const userRoute = require('./routes/users');
const logs = require('./middlewares/log')
const {log, info} = require('./middlewares/log')
const app = express();
const port = 3000;

app.use(logs.log)
app.use(info)
app.use(express.json()); //req.body

app.get('/',(req,res)=>{
    res.send({info:"ok"})
})
app.use('/api/users', userRoute);

app.listen(port, () => console.log(`running  http://127.0.0.1:${port}`) )


