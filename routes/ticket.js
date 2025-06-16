import { authenticate } from "../middleware/auth";
import {
  createTicket,
  getTicket,
  getTickets,
} from "./../controllers/ticket.js";
import { authenticate } from "../middleware/auth";
import express from "express";

const router = express.Router();

router.post("/", authenticate, createTicket);
router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicket);

export default router;
