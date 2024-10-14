# 101432538_COMP3123_Assignment1
## Description

This project implements a RESTful API using Node.js, Express, and MongoDB. It allows users to manage employee records, including creating, retrieving, updating, and deleting employee information.
## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/saraeisazadeh/COMP3123-F2024.git
### Base URL

All API requests are made to `http://localhost:3000/api/v1/`

### Endpoints

- **Create a new employee**
  - **URL**: `/emp/employees`
  - **Method**: `POST`
  - **Request Body**: 
    ```json
    {
      "name": "John Doe",
      "position": "Software Developer",
      "salary": 70000
    }
    ```

- **Get all employees**
  - **URL**: `/emp/employees`
  - **Method**: `GET`

- **Update an employee**
  - **URL**: `/emp/employees/:id`
  - **Method**: `PUT`
  - **Request Body**: 
    ```json
    {
      "name": "John Smith",
      "position": "Senior Developer",
      "salary": 80000
    }
    ```

- **Delete an employee**
  - **URL**: `/emp/employees/:id`
  - **Method**: `DELETE`