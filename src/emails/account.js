const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'kumardashsumit@gmail.com',
		subject: 'Welcome To Task Manager',
		text: `Welcome to Task Manager, ${name}, Let us know how you get along with the app`,

	});
};

const sendCancellationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'kumardashsumit@gmail.com',
		subject: `Sorry to see you go.`,
		text: `Good Bye ${name}. We hope to see you back some time soon.`
	})
}

module.exports = {
	sendWelcomeEmail,
	sendCancellationEmail
};