const prisma = require('../models');
const transporter = require('../config/mailConfig');

exports.createReferral = async (req, res) => {
  const { referrer, referee, course, email } = req.body;

  if (!referrer || !referee || !course || !email) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const referral = await prisma.referral.create({
      data: { referrer, referee, course, email }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'You have been referred!',
      text: `${referrer} has referred you to the course: ${course}.`
    };

    transporter.sendMail(mailOptions, error => {
      if (error) {
        console.log('Email Error:', error);
        return res.status(500).send('Email could not be sent.');
      }
      res.status(201).send(referral);
    });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).send('Failed to save referral.');
  }
};
