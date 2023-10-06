import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    console.log("REQ.BODY", req.body);
    await sendgrid.send({
    to: 'kussoftware05@gmail.com',
    from: 'support@zertz.io', // Use the email address or domain you verified above
      subject: 'hello',//`${req.body.subject}`,
      html: `<div>You've got a mail</div>`,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;