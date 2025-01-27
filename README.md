# Dynamic Issue Tracker

A full-stack web application for managing issues dynamically, featuring a React frontend, Node.js/Express backend, and MySQL database.

## Features

- **View Issues**: Retrieve and display all issues from the database.
- **Add Issues**: Add new issues with details such as location, category, severity, and more.
- **Edit Issues**: Update issue details directly through the frontend.
- **Delete Issues**: Remove issues from the database with confirmation.
- **Image Support**: Upload and display images for each issue.

---

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MySQL** (v8.0 or higher)
3. **npm**

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone [(https://github.com/rakkkkkesh/dynamic_issue_tracker.git)]
cd dynamic-issue-tracking-table
```

### 2. Set Up the Backend

1. Navigate to the backend directory:
    cd dynamic-issue-tracking-table

2. Install dependencies:
    npm install

3. Configure the MySQL database:
   - Open the code and ensure the database connection in the `db` object matches your MySQL setup:
     ```javascript
     const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'root',
       database: 'issue_tracker',
     });
     ```
   - Create a database in MySQL:
     ```sql
     CREATE DATABASE issue_tracker;
     ```
   - Create a table for issues:
     ```sql
     CREATE TABLE issues (
       id INT AUTO_INCREMENT PRIMARY KEY,
       location VARCHAR(255),
       category VARCHAR(255),
       subcategory VARCHAR(255),
       description TEXT,
       severity VARCHAR(50),
       imagePath VARCHAR(255),
       referenceCode1 VARCHAR(255),
       referenceCode2 VARCHAR(255)
     );
     ```

   - Insert a data for issues:
     ```sql
     
      INSERT INTO issues (location, category, subcategory, description, severity, imagePath, referenceCode1, referenceCode2)
      VALUES
      ('Bathroom', 'Plumbing & Fixtures', 'Shower', 'Shower head has low water pressure.', 'Moderate', '/Images/low_pressure_shower.jpg', 'B2 PL', 'S 3'),
      ('Bedroom', 'Electrical Work', 'Wiring', 'Exposed wires near the bedside table, potential hazard.', 'Critical', '/Images/exposed_wires.jpg', 'B2 EL', 'S 4'),
      ('Hallway', 'Plumbing & Fixtures', 'Pipe', 'Burst pipe in the hallway, flooding the floor.', 'Critical', '/Images/burst_pipe.jpg', 'H2 PL', 'S 5'),
      ('Kitchen', 'Electrical Work', 'Oven', 'Oven is not turning on, malfunctioning electrical wiring.', 'Critical', '/Images/oven_failure.jpg', 'K2 EL', 'S 6'),
      ('Garage', 'Plumbing & Fixtures', 'Water Heater', 'Water heater making a loud noise, possible malfunction.', 'Moderate', '/Images/loud_water_heater.jpg', 'G2 PL', 'S 7'),
      ('Living Room', 'Electrical Work', 'Sockets', 'Power outlets not working, possibly due to tripped circuit.', 'Moderate', '/Images/outlet_problem.jpg', 'L2 EL', 'S 8'),
      ('Dining Room', 'Plumbing & Fixtures', 'Faucet', 'Faucet leaking from the base when turned on.', 'Moderate', '/Images/leaking_faucet.jpg', 'D2 PL', 'S 9'),
      ('Bathroom', 'Electrical Work', 'Fan', 'Exhaust fan not working, needs repair or replacement.', 'Moderate', '/Images/fan_failure.jpeg', 'B2 EL', 'S 10');
      
           ```

4. Start the backend server:
    ```bash
    nodemon server.js
    ```
    The backend will run at `http://localhost:3000`.

### 3. Set Up the Frontend

1. Navigate to the frontend directory:
    ```bash
    cd dynamic-issue-tracking-table
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Build the frontend for production:
    ```bash
    npm run build
    ```
    
4. Start the development server:
    ```bash
    npm start
    ```
    The frontend will run at `http://localhost:3000`.

---

## API Endpoints

### Backend

- **GET /issues**: Retrieve all issues.
- **POST /issues**: Add a new issue.
  - Body parameters:
    ```json
    {
      "location": "string",
      "category": "string",
      "subcategory": "string",
      "description": "string",
      "severity": "string",
      "imagePath": "string",
      "referenceCode1": "string",
      "referenceCode2": "string"
    }
    ```
- **PUT /issues/:id**: Update an issue by ID.
  - Body parameters: Same as POST.
- **DELETE /issues/:id**: Delete an issue by ID.

---

## Usage

1. Open the application at `http://localhost:3000`.
2. Interact with the issue tracker to:
   - Add new issues.
   - Edit existing issues.
   - View the list of issues.
   - Delete issues as needed.

---

## Project Structure

```
dynamic-issue-tracking-table
├── build
├── node_modules
├── public
|   ├── Images
|   |     └── Your all images are here
|   ├── index.html
|   ├── manifest.json
├── src
│   ├── Components
|   |       ├── DeleteConfirmation.jsx
|   |       ├── EditModal.jsx
|   |       ├── Table.jsx
│   └── App.js
|   ├── index.js
|   ├── reportWebVitals.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── server.js
```

---

## Notes

- Ensure the MySQL database is running and accessible before starting the backend.
- Configure CORS if accessing the backend from a different origin.

---

## License

This project is licensed under the MIT License.

