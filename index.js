// index.js
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const sanitizer = require("express-sanitizer");
const config = require("./app.config"); // Import the config directly
const routes = require("./routes/app.routes");

// Middleware
app.use(sanitizer());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(config.helmet);
app.use(config.cspHeader);
app.use(config.cookieSession);

//logger
app.use(morgan("combined"));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);

// Routes
app.use(express.static(path.join(__dirname, "public")));
app.use(routes); // Use the routes directly from the imported config

// 404 Not Found
app.use((req, res) => {
  console.warn("Route not found:", req.url);
  res.status(404).sendFile(path.join(__dirname, "/public/pages/notFound.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
