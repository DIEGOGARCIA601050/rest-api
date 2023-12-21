const path = require('path');
const cors = require('cors')
const express = require('express')
const PORT = process.env.PORT ?? 3000

const app = express()

app.use(cors({
    origin: (origin, callback) => {
      const AceptedOrigins = [
        '*',
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
app.use(express.json())

app.disable('x-powered-by')

app.get('/',(req, resp)=>{
    resp.sendFile(path.resolve('./web/index.html'));
})

app.get('/red-social', (req, res) => {
    res.sendFile(path.resolve('../Conversor/alexander-sinn-YYUM2sNvnvU-unsplash.jpg'))
})

app.get('/usuarios/registro', cors(), (req, resp)=>{
    resp.json({
        nombre: 'John',
        edad: 25,
        correo: 'john.adams@example-pet-store.com'
    }
    )
})

app.post('/', cors(), (req, res) => {
    const data = req.body;
    console.log(data);
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