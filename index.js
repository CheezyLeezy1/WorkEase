const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const crypto = require("crypto");
const sanitizer = require("express-sanitizer");

app.use(sanitizer());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    secret: generateSessionSecret(), // Pass the function reference
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Ensure cookies are only sent over HTTPS
      maxAge: 3600000, // Expires in 1 hour
    },
  })
);

// Function to generate a random session secret
function generateSessionSecret() {
  try {
    return crypto.randomBytes(32).toString("hex");
  } catch (error) {
    console.error("Error generating session secret:", error.message);
  }
}

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

// Serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/public/pages/dashboard.html");
});

app.get("/xss", (req, res) => {
  res.sendFile(__dirname + "/public/pages/xss.html");
});

app.get("/xss-submit", (req, res) => {
  // Use req.query.name to get the 'name' parameter from the query string
  const name = req.sanitize(req.query.name);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>XSS Result</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    </head>

    <body>
        <section class="hero is-success is-fullheight">
        <div class="hero-body">
        <div class="container has-text-centered">
            <p class="title">
                Welcome to the XSS Vulnerability Page
            </p>
            <p class="subtitle">
            <p class="title">Welcome, ${name || "Guest"}!</p>
            </p>

            <p class="subtitle">
            <p class="title">Well... seems like this page could introduce some vulnerabilities, shame....</p>
            </p>
        </div>
    </div>
        </section>
    </body>

    </html>
  `);
});

app.use((req, res) => {
  console.warn("Route not found:", req.url);
  res.status(404).sendFile(path.join(__dirname, "/public/pages/notFound.html"));
});

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
