const Joi = require('joi');


const recordSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  emoji_id: Joi.number(), 
  description: Joi.string().min(10).required(),
  imageUrl: Joi.string(), 
});

module.exports = recordSchema;
