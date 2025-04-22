/**********************************
 * Desc: Handle payout-related requests.
 * Auth: GitHub Copilot
 * Date: 22/04/2025
 **********************************/

import controllerWrapper from "../../middleware/controllerHandler.js";
import payoutService from "../../services/payoutService.js";

/**
 * Get all payouts with cursor-based pagination
 */
const getPayouts = controllerWrapper(async (req, res) => {
  const requestParams = req.query;
  const tokenData = req.tokenData;

  // Get payouts from service
  const result = await payoutService.getPayouts(requestParams, tokenData);

  if (!result || !result.data || result.data.length === 0) {
    return res.success(
      "record_not_found",
      {
        data: [],
        pagination: {
          hasMore: false,
          nextCursor: null,
        },
      },
      200
    );
  }

  return res.success("record_found", result, 200);
});

export default {
  getPayouts,
};
