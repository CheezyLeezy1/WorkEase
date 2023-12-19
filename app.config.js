// app.config.js
const cookieSession = require("cookie-session");
const crypto = require("crypto");
const { expressCspHeader, SELF, NONCE } = require("express-csp-header");
const helmet = require("helmet");
const express = require("express");

const router = express.Router();

// Function to generate a random session secret
function generateSessionSecret() {
  try {
    return crypto.randomBytes(32).toString("hex");
  } catch (error) {
    console.error("Error generating session secret:", error.message);
  }
}

const config = {
  helmet: helmet(),
  cspHeader: expressCspHeader({
    directives: {
      "default-src": [SELF],
      "img-src": [SELF, "data:"],
      "style-src": [SELF, "https://cdn.jsdelivr.net", NONCE],
      "script-src": [SELF, NONCE],
      "object-src": ["none"],
      "frame-ancestors": ["none"],
      "base-uri": [SELF],
      "form-action": [SELF],
      "frame-src": [SELF],
    },
  }),
  cookieSession: cookieSession({
    secret: generateSessionSecret(),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Change to false if not using HTTPS in development
      maxAge: 3600000,
    },
  }),
  router, // Include the router in the config
};

module.exports = config;
