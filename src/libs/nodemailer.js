import { createTransport } from 'nodemailer';

export function Transporter(accessToken){
  return createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      refreshToken: process.env.OAUTH2_REFRESH_TOKEN ,
      accessToken: accessToken
    }
  });
}

//transporter.verify().then(() => console.log("Ready to send emails"))