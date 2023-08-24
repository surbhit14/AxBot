const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const emailUser = process.env.emailUser;
const emailClientId = process.env.clientId;
const emailClientSecret = process.env.clientSecret;

const oauth2Client = new OAuth2(
    emailClientId,
    emailClientSecret,
    "urn:ietf:wg:oauth:2.0:oob"
);

oauth2Client.setCredentials({
    refresh_token: process.env.refreshToken,
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        type: "OAuth2",
        user: emailUser,
        clientId: emailClientId,
        clientSecret: emailClientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken,
    },
});

app.post("/send-emails", (req, res) => {
    const recipients = req.body;

    if (!Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ error: "Invalid recipients data" });
    }

    const emailPromises = recipients.map((recipient) => {
        const { to, address, amount, tokenSymbol, transactionID, dateAndTime } = recipient;

        if (!to || !address || !amount || !tokenSymbol || !dateAndTime) {
            return Promise.reject(`Missing parameters for recipient ${to}`);
        }

        const mailOptions = {
            from: emailUser,
            to: to,
            subject: "New Fund Transfer",
            text: `
          Dear Recipient,
  
          We're excited to inform you that you've received a new fund transfer to your account!
  
          Details of the Transfer:
  
          From Address: ${address}
          Amount: ${amount} ${tokenSymbol}
          Transaction ID: ${transactionID || 'N/A'}
          Date & Time: ${dateAndTime}
  
          This transfer was initiated via our Discord bot, ensuring a seamless and secure transaction process.
        `,
        };

        return transporter.sendMail(mailOptions);
    });

    Promise.all(emailPromises)
        .then(() => {
            console.log("Emails sent successfully");
            res.json({ message: "Emails sent successfully" });
        })
        .catch((error) => {
            console.error("Error sending emails:", error);
            res.status(500).json({ error: "An error occurred while sending the emails" });
        });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
