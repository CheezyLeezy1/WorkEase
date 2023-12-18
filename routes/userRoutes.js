const express = require("express");
const router = express.Router();
const db = require("../database.js");
const md5 = require("md5");
const sanitizer = require("express-sanitizer");

router.use(sanitizer());

// Register a new user
router.post("/secureRegister", (req, res) => {
  const name = req.sanitize(req.body.name);
  const company = req.sanitize(req.body.company);
  const email = req.sanitize(req.body.email);
  const password = req.sanitize(req.body.password);

  if (!name || !company || !email || !password) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const insertUser =
    "INSERT INTO users (name, company, email, password) VALUES (?,?,?,?)";
  db.run(insertUser, [name, company, email, md5(password)], function (err) {
    if (err) {
      console.error("Database insertion error:", err.message);
      return res.status(500).json({ error: "Error during user registration" });
    }
    const userId = this.lastID;

    req.session.userId = userId;
    res.redirect("/dashboard");
  });
});

router.post("/secureLogin", (req, res) => {
  const email = req.sanitize(req.body.email);
  const password = req.sanitize(req.body.password);

  try {
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
    }

    const hashedPassword = md5(password);

    console.log("Attempting login with email:", email);
    console.log("Hashed Password:", hashedPassword);

    const selectUser = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.get(selectUser, [email, hashedPassword], (err, row) => {
      if (err) {
        console.error("Database error during login:", err.message);
        return res
          .status(500)
          .json({ error: "Internal Server Error during login" });
      }

      if (!row) {
        console.log("Login failed for email:", email);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      console.log("Login successful for email:", email);
      req.session.userId = row.id;
      console.log(row.userId);
      res.redirect("/dashboard");
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
