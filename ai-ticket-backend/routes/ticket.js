import { authenticate } from "../middleware/auth.js";
import {
  createTicket,
  getTicket,
  getTickets,
} from "./../controllers/ticket.js";
import express from "express";

const router = express.Router();

router.post("/", authenticate, createTicket);
router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicket);

export default router;
