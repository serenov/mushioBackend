const Joi = require('joi');

function validateSchema(userInput, schema) {
  const { error } = schema.validate(userInput);

  if (error) {

    const newError = new Error(error.details[0].message);
    newError.code = 401;
    
    throw newError;
  }
}

module.exports = validateSchema;
