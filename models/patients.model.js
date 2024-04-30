const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  medicalHistory: String,
  contact: String,
  ward: String,
});

const Patients = mongoose.model("Patients", patientSchema);

module.exports = Patients;
