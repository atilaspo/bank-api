import express, { RequestHandler } from "express";
import { registerUserHandler, userRegistrationValidations, getUserHandler, getUserValidations } from "../controllers/userController";

const router = express.Router();

router.post("/", userRegistrationValidations as RequestHandler[], registerUserHandler);
router.get("/:id", getUserValidations as RequestHandler[], getUserHandler);

export default router;
