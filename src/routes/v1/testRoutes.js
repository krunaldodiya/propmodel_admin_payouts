/**********************************
 * Desc: Define routes for test module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import express from "express";

// import middleware
import tokenValidation from "../../middleware/tokenValidation.js";

// import controller
import testController from "../../controllers/v1/testController.js";

const router = express.Router();

router.get("/test", tokenValidation, testController.hello);

export default router;
