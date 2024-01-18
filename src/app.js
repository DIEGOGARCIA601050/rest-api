const Users = require('./Users.json')
const { ValidateSchema, validateParcialMovie } = require('./Schemas/Users')
const path = require('path');
const { randomUUID } = require('node:crypto')
const { hashSync } = require('bcrypt')
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.static(path.resolve('./web')))
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        const AceptedOrigins = [
          'http://localhost:3000',
          'dominio.example'
        ]
        if (AceptedOrigins.includes(origin)) {
          return callback(null, true)
        }
        if (!origin) {
          return callback(null, true)
        }
        return callback(new Error('No hay cors'))
      }
}))

app.disable('x-powered-by')

app.get('/', (req, resp) => {
    resp.sendFile(path.resolve('./web/index.html'));
})

app.get('/usuarios/registro', (req, resp) => {
    resp.json(Users)
})

app.post('/', cors(), (req, res) => {
    req.header('Access-Control-Allow-Origin', '*')
    const data = req.body;
    const Validator = ValidateSchema(data)
    if (!Validator.success) {
        res.status(404).send({message: "not found"})
    }
    const User = {
        id: randomUUID(),
        ...data
    }
    Users.push(User)
    res.send(data)
})

app.put('/usuarios',(req, resp)=>{
    resp.json({"message": "usuario actualizado exitosamente"});
})

app.delete('/usuarios',(req, resp)=>{
    resp.send({"message": "usuario borrado exitosamente"})
})

app.patch('/usuarios/:id',(req, resp)=>{
    const { id } = req.params
    const { nombre, apellido, contrasena, edad } = req.body
    Validador = validateParcialMovie(req.body)
    const user = Users.findIndex(user => user.id === id)
    if (!Validador.success || user < 0) {
        return resp.status(400).json(`${Validador} ${user}`)
    }
    if (nombre) Users[user].nombre = nombre
    if (apellido) Users[user].apellido = apellido
    if (contrasena) {
        Users[user].contrasena = contrasena
        Users[user].contrasena = hashSync(contrasena, 10)
    }
    if (edad) {
        Users[user].edad = edad
    }
    console.log(req.body);
    console.log(req.body?.nombre);
    resp.json({"message": "cambios realizados en el usuario exitosamente"})
})

app.use((req, res) => {
    res.status(404).json({"Error 404": "page not found"})
})

app.listen(PORT)
console.log(`Server on  http://localhost:${PORT}`)
console.log(cors);