import nodemailer from "nodemailer";

async function sendResetPasswordEmail(email: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",  // ใช้ 'apikey' เป็นชื่อผู้ใช้ของ SendGrid
      pass: process.env.SENDGRID_API_KEY,  // ใช้ API Key ของ SendGrid
    },
  });

  const mailOptions = {
    from: "your-email@sendgrid.com",  // อีเมลผู้ส่ง (อาจใช้โดเมนจาก SendGrid)
    to: email,
    subject: "Reset Your Password",
    text: `Click the link below to reset your password: ${resetLink}`,
  };

  try {
    console.log("Sending email to:", email);
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully");
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Error sending email");
  }
}

export default sendResetPasswordEmail;
