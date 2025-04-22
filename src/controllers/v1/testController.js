/**********************************
 * Desc: Handle test-related requests.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import controllerWrapper from "../../middleware/controllerHandler.js";
import testService from "../../services/testService.js";

const hello = controllerWrapper(async (req, res) => {
  const requestParams = req.query;
  const tokenData = req.tokenData;
  const message = await testService.greet(requestParams, tokenData);

  if (!message) {
    return res.success("record_not_found", [], 404);
  }

  return res.success("record_found", message, 200);
});

export default {
  hello,
};
