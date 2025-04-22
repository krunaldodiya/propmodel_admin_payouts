/**********************************
 * Desc: Define validation schema for test module.
 * Auth: Krunal Dodiya
 * Date: 22/04/2025 (Updated)
 **********************************/

import Joi from "joi";

const getUsersRequest = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit should be a number",
    "number.integer": "Limit should be an integer",
    "number.min": "Limit should be at least 1",
    "number.max": "Limit should be at most 100",
  }),
  cursor: Joi.string().allow(null, "").optional().messages({
    "string.base": "Cursor should be a string representing a UUID",
  }),
});

export { getUsersRequest };
