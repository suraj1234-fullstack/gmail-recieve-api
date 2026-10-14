const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer transporter setup (Yahan apna email aur App Password daalna)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sandhyachoudhary2005@gmail.com',     // Jiss email par message mangwana hai
        pass: 'ghnd qqmr yzrq lvde'           // Gmail ka App Password
    }
});

// Contact form ka API route
app.post('/api/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const mailOptions = {
            from: email,
            to: 'sandhyachoudhary2005@gmail.com', // Yeh message tujhe milega
            subject: `Naya message mila ${name} ki taraf se!`,
            text: `Naam: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message successfully tere mail par bhej diya gaya hai!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Message bhejne mein kuch gadbadi ho gayi.' });
    }
});

app.listen(5000, () => console.log('Server port 5000 par chal raha hai'));