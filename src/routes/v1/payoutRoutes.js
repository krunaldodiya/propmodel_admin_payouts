/**********************************
 * Desc: Define routes for payout module.
 * Auth: GitHub Copilot
 * Date: 22/04/2025
 **********************************/

import express from "express";

// import middleware
import tokenValidation from "../../middleware/tokenValidation.js";

// import controller
import payoutController from "../../controllers/v1/payoutController.js";

const router = express.Router();

// GET endpoint for fetching payouts with cursor-based pagination
router.get("/admin/payouts", tokenValidation, payoutController.getPayouts);

export default router;
