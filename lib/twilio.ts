import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let client: ReturnType<typeof twilio> | null = null;

if (accountSid && authToken && accountSid !== 'your_twilio_account_sid') {
  client = twilio(accountSid, authToken);
}

export async function sendOTP(phone: string, otp: string): Promise<boolean> {
  if (!client || !twilioPhoneNumber) {
    console.log(`[DEV MODE] OTP for ${phone}: ${otp}`);
    return true;
  }

  try {
    await client.messages.create({
      body: `Your Amirtha E-commerce verification code is: ${otp}. Valid for 10 minutes.`,
      from: twilioPhoneNumber,
      to: `+91${phone}`,
    });
    return true;
  } catch (error) {
    console.error('Twilio error:', error);
    console.log(`[FALLBACK] OTP for ${phone}: ${otp}`);
    return true;
  }
}
