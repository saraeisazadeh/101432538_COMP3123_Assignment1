// index.js
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const userRoutes = require('./routes/userRoutes'); // User routes
const employeeRoutes = require('./routes/employeeRoutes'); // Employee routes
const connectDB = require('./db'); // Database connection function

// Initialize the app
const app = express(); 

// Middleware to parse JSON bodies
app.use(express.json()); // Make sure this is at the top before using routes

// Connect to the database
connectDB();

// Set up the user routes
app.use('/api/v1/user', userRoutes);

// Set up the employee routes
app.use('/api/v1/emp', employeeRoutes);

// Sample route for health check
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// POST /api/v1/emp/employees
app.post('/api/v1/emp/employees', async (req, res) => {
    try {
        const Employee = require('./models/Employee'); // Import the Employee model here
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
        const Employee = require('./models/Employee'); // Import the Employee model here
        const employees = await Employee.find(); // Fetch all employees from the database
        console.log('Retrieved Employees:', employees); // Log the retrieved employees
        res.json(employees); // Send the employee data as JSON
    } catch (error) {
        console.error('Error fetching employees:', error); // Log any errors
        res.status(500).json({ message: 'Error fetching employees' });
    }
});
