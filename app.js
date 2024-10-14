const express = require('express');
const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const Employee = require('./models/Employee'); // Adjust the path based on your project structure
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample route to add an employee
app.post('/api/v1/emp/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body); // Create a new employee from the request body
        await employee.save(); // Save the employee to the database
        console.log(req.body);
        res.status(201).send('Employee added');
    } catch (error) {
        console.error('Error adding employee:', error); // Log any errors
        res.status(500).send('Error adding employee');
    }
});

// GET route to fetch all employees
app.get('/api/v1/emp/employees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees from the database
        console.log('Retrieved Employees:', employees); // Log the retrieved employees
        res.json(employees); // Send the employee data as JSON
    } catch (error) {
        console.error('Error fetching employees:', error); // Log any errors
        res.status(500).json({ message: 'Error fetching employees' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
