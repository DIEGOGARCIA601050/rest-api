const express = require('express');
const path = require('node:path')
const port = process.env.PORT ?? 3000


const app = express();

app.get('/',(req, resp)=>{
  resp.sendFile(path.resolve('./index.html'))
});

app.get('/products',(req, resp)=>{
  resp.sendFile(path.resolve('./products.html'))
});

app.get('/contacto',(req, resp)=>{
  resp.json({
    numero: 72283183,
    web: "http://#",
    correo: "correo.correo.com"
  })
});



app.listen(port, () => {
  console.log(`Server on port http://localhost:${port}`);
})
