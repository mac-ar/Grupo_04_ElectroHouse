// Usando la destructuracion uso solamente el body del  express-validator
const { body } = require('express-validator');
const path = require('path');

//Creo la logica del middleware de validacion de carga de Registro
module.exports = [
    body('nombre').notEmpty().withMessage('Escribe un Nombre')
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres'),
    body('apellido').notEmpty().withMessage('Escribe un Apellido')
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres'),
    body('email').notEmpty().withMessage('Escribe un Email').bail()
        .isEmail().withMessage('Escribe un Email valido'),
    //body('foto').notEmpty().withMessage('Ingrese una foto de perfil'),
    body('foto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Debe ingrasar un foto de Perfil');
        } else {
            let fileExtension = path.extname(file.originalname);
            //console.log(fileExtension);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }),
    body('usuario').notEmpty().withMessage('Escribe un nombre de Usuario'),
    body('password').notEmpty().withMessage('Ingrese una Contraseña').bail()
]