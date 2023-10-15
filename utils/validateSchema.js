const Joi = require('joi');

function validateSchema(userInput, schema) {
  const { error } = schema.validate(userInput);

  if (error) {
    return error.details[0].message
  }
}

module.exports = validateSchema;
