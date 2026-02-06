import { Router } from "express";
import { sessionController } from "./session.controller";
import { requireAuth } from "../../middlewere/verify";

export const sessionRouter = Router();

sessionRouter.post("/session-post", requireAuth("teacher", "admin") ,sessionController.sessionPostControle)