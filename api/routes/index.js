const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

router.get('/appointments', (req, res, next) => {
  Appointment.find().then(documents => {
    res.status(200).json({
      message: "Appointment fetched successfully!",
      appointments: documents
    });    
  });
});

router.post('/appointments', (req, res, next) => {
  const appointments = new Appointment({
    appointmentDate: req.body.appointmentDate,
    name: req.body.name,
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email
  });
  appointments.save().then(createdAppointment => {
    res.status(201).json({
      message: 'Appointment added successfully!',
      appointmentId: createdAppointment._id
    });
  });
});

router.delete('/appointments/:id', (req, res, next) => {
  Appointment.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Post deleted!' });
    });
});

module.exports = router;
