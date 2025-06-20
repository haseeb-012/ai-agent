import {inngest} from "../inngest/client.js";
import Ticket from "../models/ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description is required",
      });
    }

    const newTicket = await Ticket.create({
      title,
      description,
      createdby: req.user._id.toString(),
    });

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: (await newTicket)._id.toString(),
        title,
        description,
        createdby: req.user._id.toString(),
      },
    });

    res.status(201).json({
      message: "Ticket Created  and processing started",
      ticket: newTicket,
    });
  } catch (err) {
    console.error("Error in Ticket Creation:", err);
    return res.status(500).json({
      message: "interval server Error",
      success: false,
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let ticket = [];
    if (user.role !== "user") {
      ticket = await Ticket.find({})
        .populate("assignedTO", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      ticket = await Ticket.find({ createdby: user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json(ticket);
  } catch (err) {
    console.error("Error in Getting Tickets", err);
    return res.status(500).json({
      message: "interval server Error",
      success: false,
    });
  }
};

export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    let ticket;
    if (user.role !== "user") {
      ticket = await Ticket.findById(req.params.id).populate("assignedTO", [
        "email",
        "_id",
      ]);
    } else {
      ticket = await Ticket.findOne({
        createdby: user._id,
        _id: req.params.id,
      }).select("title description status createdAt");
    }

    if (!ticket) {
      // Fix: add status code 404
      return res.status(404).json({ message: "Ticket Not Found" });
    }

    return res.status(200).json(ticket);
  } catch (err) {
    console.error("Error in Getting Ticket", err);
    return res.status(500).json({
      message: "Internal Server Error", // Fixed typo
      success: false,
    });
  }
};

