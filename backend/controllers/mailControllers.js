import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
});

const sendAdminRequestEmail = (req, res) => {
    const { email, name } = req.body;
    const mailOptions = {
        from: {
            name: "Social Multimedia",
            address: process.env.ADMIN_EMAIL,
        },
        to: process.env.ADMIN_EMAIL,
        subject: "Solicitud para ser administrador",
        text: `Se ha recibido una solicitud para ser administrador de ${name}. Email: ${email}`,
        html: `<h1>Solicitud para ser administrador</h1><p>Se ha recibido una solicitud para ser administrador de ${name}.</p><p>Email: ${email}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Error sending email" });
        } else {
            res.status(200).json({ message: "Email succesfully sent" });
        }
    });
};

export { sendAdminRequestEmail };
