const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Show newsletter page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// Handle newsletter signup
app.post("/", async (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    console.log("New subscriber:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);


    try {

        const mailgun = new Mailgun(formData);

        const mg = mailgun.client({
            username: "api",
            key: process.env.MAILGUN_API_KEY
        });

        const message = await mg.messages.create(
            process.env.MAILGUN_DOMAIN,
            {
                from: process.env.MAILGUN_FROM,

                to: [email],

                subject: "Welcome to the Deakin Newsletter!",

                text:
                    `Hi ${firstName} ${lastName},

Welcome to the Deakin Newsletter!

You have successfully subscribed using:
${email}

Thank you for subscribing.

Regards,
Deakin Newsletter`,


            }
        );


        console.log("Mailgun response:", message);

        res.send(`
            <h2>Thank you for subscribing!</h2>
            <p>A welcome email has been sent to ${email}.</p>
            <a href="/">Go back</a>
        `);

    }

    catch (error) {

        console.error("Mailgun error:", error);

        res.status(500).send(`
            <h2>Something went wrong.</h2>
            <p>We could not send the welcome email.</p>
            <a href="/">Try again</a>
        `);
    }

});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});