const path = require('path');
const { randomUUID } = require('crypto')
const express = require('express')
const Users = require('./Users.json')
const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.static(path.resolve('./web')))
app.use(express.json())

app.disable('x-powered-by')

app.get('/', (req, resp) => {
    resp.sendFile(path.resolve('./web/index.html'));
})

app.get('/usuarios/registro', (req, resp) => {
    resp.json(Users)
})

app.post('/', (req, res) => {
    req.header('Access-Control-Allow-Origin', '*')
    const data = req.body;
    const User = {
        id: randomUUID(),
        ...data
    }
    Users.push(User)
    res.send(data)
})

app.put('/usuarios',(req, resp)=>{
    resp.send('usuario actualizado exitosamente');
})

app.delete('/usuarios',(req, resp)=>{
    resp.send('usuario borrado exitosamente')
})

app.patch('/usuarios',(req, resp)=>{
    resp.send('cambios realizados en el usuario exitosamente')
})

app.use((req, res) => {
    res.status(404).send('<h1>Error 404: page not found')
})

app.listen(PORT)
console.log(`Server on  http://localhost:${PORT}`)