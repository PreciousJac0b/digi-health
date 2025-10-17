import { MailerUtils } from '../utils/mailerUtils';
import { User } from '../models/User';
import { HashUtils } from '../utils/hashUtils';
import { JWTUtils } from '../utils/jwtUtils';
import { mailTemplate } from '../utils/mailTemplateUtils';

export class AuthService {
  static async signup(email: string, password: string, state?: string, LGA?: string) {
    const hashedPassword = await HashUtils.hashPassword(password);
    const user = new User({ email, password: hashedPassword, state, LGA });
    const savedUser = await user.save();

    if (!savedUser) {
      return {
        success: false, message: 'User signup failed',
      };
    }
    return {
      success: true,
      message: 'User signed up successfully',
      user: savedUser,
    };
  }

  static async login(email: string, password: string) {
    // Implement login logic here
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    const isPasswordValid = await HashUtils.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid password' };
    }

    const token = JWTUtils.generateToken(user.id);
    return {
      success: true,
      message: 'User logged in successfully',
      user,
      token,
    };
  }

  static async forgotPassword(email: string) {
    // Implement forgot password logic here
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    // Generate a password reset token
    const resetToken = JWTUtils.generateToken(user.id);
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    // Send the reset token to the user's email
    await MailerUtils.sendPasswordResetEmail(
      user.email,
      'Password Reset Request',
      mailTemplate.passwordReset(resetLink),
    );

    return {
      success: true,
      message: 'Password reset email sent successfully',
    };
  }

  static async resetPassword(token: string, newPassword: string) {
    // Implement reset password logic here
    const decoded: any = JWTUtils.verifyAccessToken(token);
    if (decoded.error) {
      return {
        success: false,
        message: 'Invalid or expired token'
      };
    }

    // Find the user by ID and update the password
    const user = await User.findById(decoded.id);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    user.password = await HashUtils.hashPassword(newPassword);
    await user.save();

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }
}