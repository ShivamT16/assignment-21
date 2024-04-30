const express = require("express");
const cors = require("cors");
const app = express();

require("./db.connection");
const Patient = require("./models/patients.model");
const Ward = require("./models/ward.model");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Hello!! Welcome to the backend code of Patient Management Application.",
  );
});

app.post("/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    if (patients) {
      res.status(200).json(patients);
    } else {
      res.status(404).json("Patients not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.post("/patients/:id", async (req, res) => {
  try {
    const updatedData = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.status(404).json("Patient not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.delete("/patients/:id", async (req, res) => {
  try {
    const deletedData = await Patient.findByIdAndDelete(req.params.id);
    if (deletedData) {
      res.status(200).json(deletedData);
    } else {
      res.status(404).json("Patient not found");
    }
  } catch (error) {
    console.error({ Error: error });
  }
});

app.post("/wards", async (req, res) => {
  try {
    const newWard = new Ward(req.body);
    await newWard.save();
    res.status(201).json(newWard);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.get("/wards", async (req, res) => {
  try {
    const wards = await Ward.find();
    if (wards) {
      res.status(200).json(wards);
    } else {
      res.status(404).json("Wards not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.post("/wards/:id", async (req, res) => {
  try {
    const updatedData = await Ward.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.status(404).json("Ward not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.delete("/wards/:id", async (req, res) => {
  try {
    const deletedData = await Ward.findByIdAndDelete(req.params.id);
    if (deletedData) {
      res.status(200).json(deletedData);
    } else {
      res.status(404).json("Ward not found");
    }
  } catch (error) {
    console.error({ Error: error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
