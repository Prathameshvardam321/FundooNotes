import Joi from '@hapi/joi';

export const newNotesValidator = (req, res, next) => {
  const schema = Joi.object({
    Title : Joi.string().required(),
    Description : Joi.string().required(),
    Colour : Joi.string().max(20).optional(),
    UserId : Joi.string()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};
