const Joi = require('@hapi/joi')


//Register validation

const regValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(data, schema)

}

//Login validation
const logValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(data, schema)

}


module.exports.regValidation = regValidation
module.exports.logValidation = logValidation


