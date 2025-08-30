import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import { generateOTP, generateJWT } from '../../src/utils/auth';

// In-memory OTP storage (in production, use Redis or similar)
const otpStore = new Map<string, { otp: string; expires: number }>();

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const handler: Handler = async (event) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { action, email, otp } = JSON.parse(event.body || '{}');

    switch (action) {
      case 'send_otp': {
        if (!email) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Email is required' }),
          };
        }

        // Check if email is authorized (you can add your admin emails here)
        const authorizedEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim());
        if (!authorizedEmails.includes(email)) {
          return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ error: 'Unauthorized email' }),
          };
        }

        const generatedOTP = generateOTP();
        const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store OTP
        otpStore.set(email, { otp: generatedOTP, expires });

        // Send email
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: 'Your Admin Login OTP - AI CV Generator',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #043fff;">Admin Login OTP</h2>
                <p>Your one-time password for admin access is:</p>
                <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; color: #043fff; border-radius: 8px; margin: 20px 0;">
                  ${generatedOTP}
                </div>
                <p>This OTP will expire in 10 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to send OTP email' }),
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, message: 'OTP sent to email' }),
        };
      }

      case 'verify_otp': {
        if (!email || !otp) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Email and OTP are required' }),
          };
        }

        const storedData = otpStore.get(email);
        if (!storedData) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'No OTP found for this email' }),
          };
        }

        if (Date.now() > storedData.expires) {
          otpStore.delete(email);
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'OTP has expired' }),
          };
        }

        if (storedData.otp !== otp) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid OTP' }),
          };
        }

        // OTP is valid, generate JWT
        otpStore.delete(email);
        const token = generateJWT(email);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: true, 
            token,
            message: 'Login successful' 
          }),
        };
      }

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' }),
        };
    }

  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};