/**********************************
 * Desc: Define routes for test module.
 * Auth: Krunal Dodiya
 * Date: 22/04/2025 (Updated)
 **********************************/

import express from "express";

// import middleware
import tokenValidation from "../../middleware/tokenValidation.js";

// import controller
import testController from "../../controllers/v1/testController.js";

const router = express.Router();

// GET endpoint for fetching users with cursor-based pagination
router.get("/users", tokenValidation, testController.getUsers);

export default router;
