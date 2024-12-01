const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const EmployeeModel = require("../models/Emp");

router.get("/employees", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(400).json({ message: "Cant access employee list" });
  }
});

router.post("/employees", async (req, res) => {
  try {
    const newEmployee = new EmployeeModel(req.body);
    const employee = await newEmployee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).json({ message: "Please enter valid employee info" });
  }
});

router.get("/employees/:eid", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.eid);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send("Cant find employee");
  }
});

router.put("/employees/:eid", async (req, res) => {
  try {
    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.eid,
      req.body,
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(updateEmployee);
  } catch (error) {
    res.status(400).json({ message: "Please enter valid employee info" });
  }
});

router.delete("/employees/:eid", async (req, res) => {
  try {
    const deleteEmployee = await EmployeeModel.findByIdAndDelete(
      req.params.eid
    );
    if (!deleteEmployee) {
      return res.status(404).json({ message: "No Employee to Delete" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

// New search route
router.get("/search", async (req, res) => {
  try {
    const { department, position } = req.query;
    let query = {};

    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }
    if (position) {
      query.position = { $regex: position, $options: 'i' };
    }

    const employees = await EmployeeModel.find(query);
    res.status(200).send(employees);
  } catch (error) {
    res.status(400).json({ message: "Error searching employees" });
  }
});

module.exports = router;

