import * as Joi from "joi";

const schemas = {
  signup: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  createKey: Joi.object().keys({
    projectId: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    keyName: Joi.string().required(),
    value: Joi.string().required(),
    collaborators: Joi.array(),
  }),
  updateKey: Joi.object().keys({
    keyId: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    value: Joi.string().required(),
  }),
  createOrg: Joi.object().keys({
    name: Joi.string().required(),
    collaborators: Joi.array(),
  }),
  updateOrg: Joi.object().keys({
    collaborators: Joi.array(),
    organisationId: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
  }),
  createProject: Joi.object().keys({
    name: Joi.string().required(),
    organisation: Joi.string().pattern(/^[0-9]+$/),
    collaborators: Joi.array(),
  }),
  newToken: Joi.object().keys({
    projectId: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
  }),
  updateProject: Joi.object().keys({
    projectId: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    collaborators: Joi.array().required(),
    deadline: Joi.string().required(),
  }),
};

export default schemas;
