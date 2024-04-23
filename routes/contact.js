const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const AWS = require("aws-sdk");
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// const params = {
//   Destination: {
//     ToAddresses: ["recipient@example.com"],
//   },
//   Message: {
//     Body: {
//       Text: {
//         Data: "This is the email body.",
//       },
//     },
//     Subject: {
//       Data: "Test email subject",
//     },
//   },
//   Source: "sender@example.com",
// };

// ses.sendEmail(params, (err, data) => {
//   if (err) {
//     console.error("Error sending email:", err);
//   } else {
//     console.log("Email sent successfully:", data);
//   }
// });

// const sendEmail = async (name, email, phone, subject, message) => {
//   const params = {
//     Destination: {
//       ToAddresses: email,
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: message,
//         },
//       },
//       Subject: {
//         Data: subject,
//       },
//     },
//     Source: "www.tspatil03@gmail.com",
//   };
//   ses.sendEmail(params, (err, data) => {
//     if (err) {
//       console.error("Error sending email:", err);

//     } else {
//       console.log("Email sent successfully:", data);
//     }
//   });
// }

router.post(
  "/sendcontact",
  [
    body("name", "Enter a valid name").trim().isLength({ min: 3 }),
    body("email", "Enter a valid email address").trim().isEmail(),
    body("phone", "Phone no. must have 10 digis")
      .exists()
      .trim()
      .isLength({ min: 10, max: 10 }),
    body("message", "Enter a message").exists().trim(),
  ],
  async (req, res) => {
    try {
      let success = false;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }
      const { name, email, phone, subject, message } = req.body;
      const params = {
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `
              <h2>User has send some query!</h2>
              <p>Hello, My name is ${name},</p>
              <p>I want to tell you about my user experience.</p>
              <p>${message}</p>
              `
            },
            Text: {
              Data: `Hello, My name is ${name}, I want to tell you about my user experience. ${message}`,
            },
          },
          Subject: {
            Data: subject,
          },
        },
        Source: process.env.AWS_SES_SOURCE,
      };
      let datA;
      ses.sendEmail(params, (err, data) => {
        if (err) {
          console.error("Error sending email:", err);
          return res.status(400).json({ success, error: err.message })
        } else {
          success = true;
          console.log("Email sent successfully:", data);
          datA = data;
        }
      });
      const contactMessage = await Contact.create({
        name,
        email,
        phone,
        subject,
        message,
      });
      success = true;
      res.status(200).json({ success, message: "Email sent successfully", data: datA })
    } catch (error) {
      res.status(400).json({success: false, error: "Something went wrong"});
    }
  }
);

module.exports = router;
