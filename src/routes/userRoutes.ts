import express, { RequestHandler } from "express";
import { registerUserHandler, userRegistrationValidations, getUserHandler, getUserValidations } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getUserValidations as RequestHandler[], getUserHandler);

export default router;
