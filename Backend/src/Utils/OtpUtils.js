const generateOtp = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // always 6 digits
  return randomNumber.toString();
};

function getOTPEmailOptions(
  recipientEmail,
  otp,
  senderEmail = process.env.EMAIL_USER
) {
  return {
    from: senderEmail,
    to: recipientEmail,
    subject: "Your OTP Code - Verification Required",
    text: `Your OTP code is: ${otp}. This code will expire in 10 minutes. Please do not share this code with anyone.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Email Verification</h2>
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p><strong>Important:</strong></p>
        <ul>
          <li>This code will expire in <strong>10 minutes</strong></li>
          <li>Do not share this code with anyone</li>
          <li>If you didn't request this code, please ignore this email</li>
        </ul>
        <p>Thank you!</p>
      </div>
    `,
  };
}

export { generateOtp, getOTPEmailOptions };
