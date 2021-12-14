import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {google} from 'googleapis';

dotenv.config({path: '../config.env'});


const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);
oauth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

export const generateToken = () => {
    let token='';

    for(let i=0;i<4;++i){
        const val = Math.round(Math.random()*8);
        token+=val;
    }

    return token;
};

export const mailSender = () =>  {
    console.log("x1");

    try {
        //const accessToken = oauth2client.getAccessToken();
        var transport = nodemailer.createTransport({
            service:'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.MAIL_USER,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: "ya29.a0ARrdaM9Ey3giruTgbxFuGs7SFkuIg4yfvreC5dSkuFO0rPFrvGiE0rF6SFt95PM5hyPPSL571m2qj22ZGWLpwVwNyVlU4LaF_tJgj9f1nR2pO-di7L5EfZDAoI4cZKaj2tfzQd1wTJptN5aSrk6IIrbjkSHNbQ"            
            }
        });
        console.log("x2");
    } catch (error) {
        console.log(error.message)
    }

    return transport;
};