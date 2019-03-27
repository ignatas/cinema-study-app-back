import Joi from 'joi';

import { Context } from 'koa';

import userService from '../services/user';
import ApiError from '../classes/ApiError';
import customizeJoiError from '../helpers/customizeJoiError';

export default {
  async user(ctx: Context, next: Function): Promise<void> {
    const { body } = ctx.request;
    const schema = Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required()
        .options({
          language: {
            any: {
              empty: 'is required'
            },
            string: {
              min: 'should be at least 2 symbols length',
              max: 'should be max 20 symbols'
            }
          }
        }),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
    });
    await Joi.validate(body, schema, customizeJoiError);
    let existingUser;
    existingUser = await userService.findByUsername(body.username);
    if (!existingUser) {
      existingUser = await userService.findByEmail(body.email);
    }
    if (existingUser) {
      throw new ApiError(400, 'Email or username already in use');
    }
    await next();
  },

  async cinema(ctx: Context, next: Function): Promise<void> {
    const { body } = ctx.request;
    const schema = Joi.object().keys({
      title: Joi.string()
        .min(2)
        .required(),
      city: Joi.string()
        .min(2)
        .required()
    });
    await Joi.validate(body, schema, customizeJoiError);
    await next();
  }
};
