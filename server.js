const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path'); 
const app = express();
const port = 3000;

// Serve static files from the 'Images' directory
app.use('/Images', express.static('Images'));

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend to access backend

// Serve React app static files
app.use(express.static(path.join(__dirname, 'build')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'issue_tracker',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// GET all issues
app.get('/issues', (req, res) => {
  const query = 'SELECT * FROM issues';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST a new issue
app.post('/issues', (req, res) => {
  const { location, category, subcategory, description, severity, imagePath, referenceCode1, referenceCode2 } = req.body;
  const query = 'INSERT INTO issues (location, category, subcategory, description, severity, imagePath, referenceCode1, referenceCode2) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [location, category, subcategory, description, severity, imagePath, referenceCode1, referenceCode2], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Issue added successfully!', issueId: result.insertId });
  });
});

// PUT to update an issue
app.put('/issues/:id', (req, res) => {
  const { id } = req.params;
  const { location, category, subcategory, description, severity, imagePath, referenceCode1, referenceCode2 } = req.body;
  const query = 'UPDATE issues SET location = ?, category = ?, subcategory = ?, description = ?, severity = ?, imagePath = ?, referenceCode1 = ?, referenceCode2 = ? WHERE id = ?';
  db.query(query, [location, category, subcategory, description, severity, imagePath, referenceCode1, referenceCode2, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Issue updated successfully!' });
  });
});

// DELETE endpoint to remove an issue by ID
app.delete('/issues/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM issues WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting issue:', err);
      res.status(500).json({ message: 'Error deleting issue' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Issue not found' });
    } else {
      res.status(200).json({ message: 'Issue deleted successfully' });
    }
  }); 
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
