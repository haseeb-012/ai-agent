import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import User from "../models/user.js";
import { SendMail } from "../utils/email.js";
export const onSignUp = inngest.createFunction(
  {
    id: "on-user-signup",
    retries: 2,
  },
  { event: "user/signup" },

  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError(
            "User not found with the provided email address."
          );
        }
        return userObject;
      });

      await step.run("send-welcome-email", async () => {
        // Send a welcome email to the user
        const subject = "Welcome to Our App";
        const message = `Hi there,
        Thank you for signing up for our application!
        We're excited to have you on board.`;
        await SendMail(user.email, subject, message);

        return {
          success: true,
        };
      });
    } catch (error) {
      console.error("Error in onSignUp function:", error);
      return {
        success: false,
      };
    }
  }
);
