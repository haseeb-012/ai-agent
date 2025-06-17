import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import { SendMail } from "../utils/email.js";
import analyzeTicket from "../../utils/ai-agent.js";
import User from "../models/user.js";

export const onTicketCreate = inngest.createFunction(
  { id: "on-ticket-created", 
    retries: 2 },
  { event: "ticket/created" },
  async (event, step) => {
    try {
      const { ticketId } = event.data;

      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);
        if (!ticketObject) {
          throw new NonRetriableError("Ticket not found with the provided ID.");
        }
        return ticketObject;
      });

      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, {
          status: "TODO",
        });
      });
      const aiResponce = await analyzeTicket(ticket);

      const relatedSkills = await step.run("ai-processing", async () => {
        let skills = [];
        if (aiResponce) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: !["low", "medium", "high"].includes(aiResponce.priority)
              ? "medium"
              : aiResponce.priority,
            helpfulNotes: aiResponce.helpfulNotes,
            status: "IN_PROGRESS",
            relatedSkills: aiResponce.relatedSkills,
          });

          skills = aiResponce.relatedSkills;
        }

        return skills;
      });

      const moderator = await step.run("assign-moderator", async () => {
        let user = await User.findOne({
          role: "moderator",
          skills: {
            $elemMatch: {
              $regex: relatedSkills.join("|"),
              $option: "i",
            },
          },
        });

        if (!user) {
          user = await User.findOne({
            role: "admin",
          });
        }

        await Ticket.findByIdAndUpdate(ticket._id, {
          assignedTO: user?._id || null,
        });

        return user;
      });

      await step.run("send-email-notification", async () => {
        if (moderator) {
          const finalTicket = await Ticket.findById(ticket._id);
          // Send a confirmation email  to the user
          await SendMail(
            moderator.email,
            "Ticket assigned",
            `a new ticker is assign to you  ticket Title :  ${finalTicket.title} `
          );
        }
      });

      return { success: true };
    } catch (err) {
       console.error("Error in onTicketCreate function:", err);
      return {
        success: false,
      };
    }
  }
);
 