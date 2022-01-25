const express = require("express");
const mysql = require("mysql");

// MySQL connection properties
const config = {
  host: "db",
  user: "root",
  password: "123456",
  database: "challenge",
};

// Creating connection
const conn = mysql.createConnection(config);

// Inserting initial data
const insert = `INSERT INTO people(name) VALUES("Andre")`;
conn.query(insert);

// Preparing Express Server
const app = express();
const port = 3000;

// Create default route
app.get("/", (req, res) => {
  // Selecting names from our database
  const selection = `SELECT name FROM people`;
  conn.query(selection, (error, results) => {
    // If anything goes wrong, show the message
    if (error) res.send(error.message);

    // Adapt the response with the query result
    const names = results.map((x) => x.name).join(", ");
    const response = `
            <h1>Full Cycle Rocks!</h1>
            Results: ${names}
        `;

    // Send response back
    res.send(response);
  });
});

// Starting server
app
  .listen(port, () => {
    console.log(`Server started! Listening on ${port}...`);
  })
  .on("close", () => conn.end()); // Close DB connection on server close
