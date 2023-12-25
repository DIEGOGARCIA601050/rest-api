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

function validateParcialMovie (object) {
  const validate = schema.partial().safeParse(object)
  return validate
}

module.exports = {
    ValidateSchema,
    validateParcialMovie
}