import express from "express";
import { StateController } from "../controllers/stateController";

const router = express.Router();

router.get("/", StateController.getAllStates);
router.post("/seed", StateController.seedStates);

export default router;
