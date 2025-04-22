/**********************************
 * Desc: Define validation schema for payout module.
 * Auth: GitHub Copilot
 * Date: 22/04/2025
 **********************************/

import Joi from "joi";

const getPayoutsRequest = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit should be a number",
    "number.integer": "Limit should be an integer",
    "number.min": "Limit should be at least 1",
    "number.max": "Limit should be at most 100",
  }),
  cursor: Joi.string().allow(null, "").optional().messages({
    "string.base": "Cursor should be a string representing a timestamp",
  }),
  status: Joi.number().integer().optional().messages({
    "number.base": "Status should be a number",
    "number.integer": "Status should be an integer",
  }),
  type: Joi.string().valid("program", "affiliate").optional().messages({
    "string.base": "Type should be a string",
    "any.only": "Type should be either 'program' or 'affiliate'",
  }),
});

export { getPayoutsRequest };
