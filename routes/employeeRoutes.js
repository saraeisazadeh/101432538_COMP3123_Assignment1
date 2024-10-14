// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); // Import Employee model

// GET /api/v1/emp/employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving employees.' });
    }
});



// GET /api/v1/emp/employees/:eid
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ message: 'Employee not found.' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving employee details.' });
    }
});

router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
    });

    try {
        const savedEmployee = await newEmployee.save(); // Save the employee
        console.log('Employee created:', savedEmployee); // Log the saved employee
        res.status(201).json(savedEmployee); // Return the full employee details
    } catch (error) {
        console.error('Error creating employee:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating employee.' });
    }
});


// PUT /api/v1/emp/employees/:eid
router.put('/employees/:eid', async (req, res) => {
    const { position, salary } = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, { position, salary }, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found.' });
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee details.' });
    }
});

// DELETE /api/v1/emp/employees?eid=xxx
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    try {
        const result = await Employee.findByIdAndDelete(eid);
        if (!result) return res.status(404).json({ message: 'Employee not found.' });
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee.' });
    }
});

module.exports = router;
