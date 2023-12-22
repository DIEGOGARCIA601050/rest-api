const z = require('zod');
const schema = z.object({
    nombre: z.string({
        invalid_type_error: 'Dato ingresado incorrecto'
      }),
    apellido: z.string({
        invalid_type_error: 'Dato ingresado incorrecto'
      }),
    contrasena: z.string({
        invalid_type_error: 'Dato ingresado incorrecto'
      }),
    edad: z.number({
        invalid_type_error: 'Dato ingresado incorrecto'
      }).int()
})

function ValidateSchema(Object) {
    return schema.safeParse(Object)
}

module.exports = {
    ValidateSchema
}