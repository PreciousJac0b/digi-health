import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export class MailerUtils {
  private static transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  static async sendPasswordResetEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      };
      // text: `You requested a password reset. Here is your token: ${token}`,

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}