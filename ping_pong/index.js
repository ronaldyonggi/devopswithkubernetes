const { Pool } = require("pg");
const express = require("express");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const app = express();

const PORT = process.env.PORT || 3002;

const initializeDb = async () => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS pongs (id SERIAL PRIMARY KEY, count INT)"
  );

  // Check if a row exists, if not, insert
  const result = await pool.query("SELECT COUNT(*) as count FROM pongs");
  if (result.rows[0].count === "0") {
    await pool.query("INSERT INTO pongs(count) VALUES(0)");
  }
};

initializeDb();

app.get("/pingpong", async (req, res) => {
  try {
    // Run DB Query
    const result = await pool.query(
      "UPDATE pongs SET count = count + 1 RETURNING count"
    );

    // Extract new count from the DB response
    // The result object has a rows property -> an array of all the rows that were returned
    // e.g. [row1, row2, etc.]
    // Since we are only getting one row with one column (count), our value is in result.row[0].count
    const newCount = result.rows[0].count;

    // Send the new count back to user
    res.send(newCount.toString());
  } catch (e) {
    console.error(e);
    res.status(500).send("Error connecting to DB");
  }
  counter++;
  res.send(counter.toString());
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
