import { totp } from 'otplib';

export function emailTokenGenerator(seconds) {

  totp.options = {
    digits: 5,
    step: seconds,
    window: 1
  }
  const token = totp.generate(process.env.AUTH_SECRET);

  return token;
}

export function emailTokenValidator(token) {
  try {

    const isValid = totp.verify({
      token: token,
      secret: process.env.AUTH_SECRET
    });

    return isValid

  } catch (error) {
      console.error('error', error);
  }
}