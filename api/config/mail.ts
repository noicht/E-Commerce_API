import nodemailer from 'nodemailer';
import Email from 'email-templates';
import path from 'path';
import { EMAIL_PASSWORD,EMAIL_USER } from './constantes';
const pathTemplate = path.join(__dirname, '..', 'templates/mails/');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:EMAIL_USER,
        pass:EMAIL_PASSWORD,
    },
});

const emailApi = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
        root: `${pathTemplate}`,
        options: {
            extension: 'twig',
        },
    },
});

export default emailApi;