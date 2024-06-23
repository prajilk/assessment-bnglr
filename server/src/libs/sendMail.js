const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// Function to send an email
const sendMail = async ({ userMail, link, template, subject }) => {
    try {
        // This fixes ENOENT Error from vercel
        path.join(process.cwd(), 'src', 'mail-templates', template);

        // create a transporter object for sending emails
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // email address
                pass: process.env.PASSWORD // password
            },
            secure: true
        });

        // configure handlebars options for templating
        const handlebarOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.join(process.cwd(), 'src', 'mail-templates'),
                defaultLayout: false
            },
            viewPath: path.join(process.cwd(), 'src', 'mail-templates'),
            extName: ".handlebars",
        };

        // use handlebars to compile email templates
        transporter.use('compile', hbs(handlebarOptions));

        // define email options
        var mailOptions = {
            from: process.env.EMAIL, // sender email address
            to: userMail, // recipient email address
            subject, // email subject
            template: template.split(".")[0], // email template name (without extension)
            context: { // data to be passed to the email template
                link,
                date: new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })
            }
        };

        // send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// export the sendMail function
module.exports = { sendMail };