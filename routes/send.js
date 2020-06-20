const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')


router.post('/',  async (req, res, next) => {
    const output = `
        <p>Tienes una nueva solicitud de contacto</p>
        <h3>Información de Contacto </h3>
        <ul>
        <li>Nombre: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Teléfono: ${req.body.phone}</li>
        </ul>
        <h3>Mensaje</h3>
        <p>${req.body.message}</p>
    `;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "p3plcpnl0806.prod.phx3.secureserver.net",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'no-reply@filup.mx', // generated ethereal user
            pass: 'cybercyber', // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Marco García - Node Mailer 👻" <no-reply@filup.mx>', // sender address
        to: "antonio_villegas@hotmail.com, gantonio1000@gmail.com", // list of receivers
        subject: "Formulario de Contacto ✔", // Subject line
        text: "Tienes una nueva solicitud de información", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('index', {msg:`La información se envió exitosamente`})
});

module.exports = router;
