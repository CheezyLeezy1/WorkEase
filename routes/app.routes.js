//app.routes.js
const express = require("express");
const path = require("path");
const { requireAuth } = require("./authMiddleware");
const userRoutes = require("./userRoutes");
const router = express.Router();

router.use("/users", userRoutes);

// Serve index.html from the public directory
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.get("/xss", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "pages", "xss.html"));
});

router.get("/dashboard", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "pages", "dashboard.html"));
});

router.get("/loginPage", (req, res) => {
  const nonce = res.locals.nonce;

  const html = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WorkEase:Login</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
      </head>
      
      <body>
      <form id="loginForm" action="/users/secureLogin" method="POST">
      <div class="hero is-fullheight">
                  <div class="hero-body is-justify-content-center is-align-items-center">
      
                      <div class="columns is-flex is-flex-direction-column box">
                          <div class="column">
                              <label for="email">Email</label>
                              <input name="email" class="input is-primary" type="text" placeholder="Email address">
                              <div class="email-error"></div>
                          </div>
                          <div class="column">
                              <label for="password">Password</label>
                              <input name="password" class="input is-primary" type="password" placeholder="Password">
                              <div class="password-error"></div>
                              <a href="forget.html" class="is-size-7 has-text-primary">Forgot Password?</a>
                          </div>
                          <div class="column">
                              <a class="button is-primary is-fullwidth" type="submit" id="loginButton">Login</a>
                          </div>
                          <div class="column">
                              <a class="button is-primary is-fullwidth" type="submit" href="/">Back to Home</a>
                          </div>
                          <div class="has-text-centered">
                              <p class="is-size-7"> Don't have an account? <a href="/registerPage" class="has-text-primary">Sign
                                      up</a>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </form>
          <script nonce="${nonce}" src="/scripts.js"></script>
          </body>
      
      </html>`;

  res
    .set({
      "Content-Security-Policy": `script-src 'self' 'nonce-${nonce}'`,
      "Content-Type": "text/html",
    })
    .send(html);
});

router.get("/registerPage", (req, res) => {
  const nonce = res.locals.nonce;

  const html = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WorkEase:Registration</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
      </head>
      
      <body>
          <form id="signUpForm" action="/users/secureRegister" method="POST">
    
              <div class="hero is-fullheight">
                  <div class="hero-body is-justify-content-center is-align-items-center">
                      <div class="columns is-flex is-flex-direction-column box">
                          <div class="column">
                              <label for="name">Name</label>
                              <input name="name" class="input is-primary" type="text" placeholder="Enter Name">
                              <div class="name-error"></div>
                          </div>
      
                          <div class="column">
                              <label for="company">Company</label>
                              <input name="company" class="input is-primary" type="text" placeholder="Enter Company">
                              <div class="company-error"></div>
                          </div>
      
                          <div class="column">
                          <label for="email">Email</label>
                          <input name="email" class="input is-primary" type="text" placeholder="Email address">
                          <div class="email-error"></div>
                      </div>
                          <div class="column">
                              <label for="password">Password</label>
                              <input name="password" class="input is-primary" type="password" placeholder="Password">
                              <div class="password-error"></div>
                              <label>
                                  <input type="checkbox">
                                  I agree to the terms and conditions
                              </label>
                          </div>
                          <div class="column">
                              <button class="button is-primary is-fullwidth" type="submit" id="signUpButton">Create an
                                  account</button>
                          </div>
                          <div class="column">
                              <a class="button is-primary is-fullwidth" href="/">Back to Home</a>
                          </div>
                          <div class="has-text-centered">
                              <p> Already have an account? <a href="/secureLogin" class="has-text-primary">Login</a>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </form>
          <script nonce="${nonce}" src="/scripts.js"></script>
          </body>
      
      </html>`;

  res
    .set({
      "Content-Security-Policy": `script-src 'self' 'nonce-${nonce}'`,
      "Content-Type": "text/html",
    })
    .send(html);
});

router.get("/xss-submit", requireAuth, (req, res) => {
  // Use req.query.name to get the 'name' parameter from the query string
  const name = req.sanitize(req.query.name);

  const html = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>XSS Result</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" >
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
  `;

  // Send the HTML string with the appropriate headers
  res
    .set({
      "Content-Type": "text/html",
    })
    .send(html);
});

module.exports = router;
