/**********************************
 * Desc: Define validation schema for test module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import Joi from "joi";

const testRequest = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "any.required": "Name is required",
  }),
});

export default testRequest;
