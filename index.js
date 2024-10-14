
const express = require('express');
const mongoose = require('mongoose'); 
const userRoutes = require('./routes/userRoutes'); 
const employeeRoutes = require('./routes/employeeRoutes'); 
const connectDB = require('./db'); 

// Initialize the app
const app = express(); 

// Middleware to parse JSON bodies
app.use(express.json()); 

// Connect to the database
connectDB();

// user routes
app.use('/api/v1/user', userRoutes);

// employee routes
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
        const Employee = require('./models/Employee'); 
        const employee = new Employee(req.body); 
        await employee.save(); 
        console.log(req.body);
        res.status(201).send('Employee added');
    } catch (error) {
        console.error('Error adding employee:', error); 
        res.status(500).send('Error adding employee');
    }
});

// GET route to fetch all employees
app.get('/api/v1/emp/employees', async (req, res) => {
    try {
        const Employee = require('./models/Employee'); 
        const employees = await Employee.find(); 
        console.log('Retrieved Employees:', employees); 
        res.json(employees); 
    } catch (error) {
        console.error('Error fetching employees:', error); 
        res.status(500).json({ message: 'Error fetching employees' });
    }
});
