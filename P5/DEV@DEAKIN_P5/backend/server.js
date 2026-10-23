
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from the React frontend.
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON request bodies with a size limit.
app.use(express.json({ limit: "10kb" }));

// Validate newsletter email addresses.
const emailSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address.")
      .email("Please enter a valid email address.")
      .max(254, "Email address is too long."),
  })
  .strict();

// Configure SendGrid using environment variables.
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Health-check endpoint.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DEV@Deakin newsletter backend is running.",
  });
});

// Newsletter subscription endpoint.
app.post("/subscribe", async (req, res) => {
  try {
    // Validate the incoming request.
    const result = emailSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message:
          result.error.issues[0]?.message ||
          "Please provide a valid email address.",
      });
    }

    const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL } = process.env;

    // Check that the email service is configured.
    if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL) {
      console.error("SendGrid configuration is incomplete.");

      return res.status(500).json({
        success: false,
        message: "The email service is not configured correctly.",
      });
    }

    const subscriberEmail = result.data.email;

    // Send the welcome email through SendGrid.
    const [sendGridResponse] = await sgMail.send({
      to: subscriberEmail,
      from: SENDGRID_FROM_EMAIL,
      replyTo: SENDGRID_FROM_EMAIL,
      subject: "Welcome to DEV@Deakin!",
      text: [
        "Thank you for subscribing to our Daily Insider newsletter!",
        "",
        "You will receive updates from DEV@Deakin.",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to DEV@Deakin!</h2>
          <p>
            Thank you for subscribing to our Daily Insider newsletter!
          </p>
          <p>You will receive updates from DEV@Deakin.</p>
        </div>
      `,
    });

    // SendGrid typically returns HTTP 202 when it accepts a message.
    console.log(
      `SendGrid accepted the email request. HTTP status: ${sendGridResponse.statusCode}`
    );

    return res.status(200).json({
      success: true,
      message:
        "Thank you for subscribing! Your welcome email has been accepted for sending.",
    });
  } catch (error) {
    const statusCode = error.response?.statusCode;

    console.error(
      "SendGrid request failed:",
      statusCode || error.message
    );

    if (statusCode === 429) {
      return res.status(503).json({
        success: false,
        message: "The email service is busy. Please try again later.",
      });
    }

    if (statusCode === 401 || statusCode === 403) {
      return res.status(502).json({
        success: false,
        message:
          "The email service rejected the request. Check your SendGrid API key and sender verification.",
      });
    }

    return res.status(502).json({
      success: false,
      message:
        "The welcome email could not be sent. Please try again later.",
    });
  }
});

// Handle malformed JSON request bodies.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body.",
    });
  }

  console.error("Unexpected backend error:", err.message);

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

// Handle requests to unknown endpoints.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
  });
});

app.listen(PORT, () => {
  console.log(`Newsletter backend running at http://localhost:${PORT}`);
});
