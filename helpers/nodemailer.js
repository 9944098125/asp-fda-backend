const nodemailer = require("nodemailer");

// Create a function to send the registration email
async function sendRegistrationEmail(email) {
  try {
    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: "Gmail", // service provider
      auth: {
        user: "srinivas72075@gmail.com",
        pass: "ifhp vypf rhqb ubpw",
      },
    });

    // Email content
    const mailOptions = {
      from: "srinivas72075@gmail.com",
      to: email,
      subject: "Welcome, you are a member of ASP_FDA now...",
      html: `
       You have successfully registered
       with us ${email?.split("@")[0]}, Login and 
       enjoy searching for food and restaurants.
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendRegistrationEmail };
