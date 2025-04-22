/**********************************
 * Desc: Handle test-related requests.
 * Auth: Krunal Dodiya
 * Date: 22/04/2025 (Updated)
 **********************************/

import controllerWrapper from "../../middleware/controllerHandler.js";
import testService from "../../services/testService.js";
import { getUsersRequest } from "../../requests/testRequest.js";

/**
 * Get users with cursor-based pagination
 */
const getUsers = controllerWrapper(async (req, res) => {
  const requestParams = req.query;
  const tokenData = req.tokenData;

  // Validate request parameters
  await getUsersRequest.validateAsync(requestParams);

  // Get users from service
  const result = await testService.getUsers(requestParams, tokenData);

  if (!result || !result.data || result.data.length === 0) {
    return res.success(
      "record_not_found",
      {
        data: [],
        pagination: {
          total: 0,
          has_more: false,
          next_cursor: null,
          per_page: parseInt(requestParams.limit || 10),
        },
      },
      200
    );
  }

  return res.success("record_found", result, 200);
});

export default {
  getUsers,
};
