import nodemailer from 'nodemailer';
import configObject from '../config/config.js';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: configObject.gmail_user_app,
        pass: configObject.gmail_password_app
    }
})

export const sendEmail = async ({service = '',to='example@example.com', subject='', html=''}) => {
    return await transport.sendMail({
        from: `${service}-${configObject.gmail_user_app}`,
        to,
        subject,
        html
    })
}
