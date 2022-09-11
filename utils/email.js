const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

// new Email(user,url).sendWelcome();
module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from =
            process.env.NODE_ENV === 'development'
                ? `Jonas ${process.env.EMAIL_FROM}`
                : `Emma emma_han20220830@outlook.com`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // sendgird
            return nodemailer.createTransport({
                host: process.env.EMAIL_HOST_PROD, // hostname
                secureConnection: false, // TLS requires secureConnection to be false
                port: process.env.EMAIL_PORT_PROD, // port for secure SMTP
                tls: {
                    ciphers: 'SSLv3'
                },
                auth: {
                    user: process.env.EMAIL_USERNAME_PROD,
                    pass: process.env.EMAIL_PASSWORD_PROD
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    // Send the actual email
    async send(template, subject) {
        // 1) render HTML using pug
        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`,
            {
                firstName: this.firstName,
                url: this.url,
                subject
            }
        );

        // 2)define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html)
        };

        // 3) create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }

    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Your password reset token (valid for only 10 minutes)'
        );
    }
};
