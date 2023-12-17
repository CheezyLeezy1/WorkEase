document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("xssForm");

  form.addEventListener("submit", function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Validate and sanitize
    const userInput = document.getElementById("employeeSearch").value;
    const sanitizedInput = sanitizeInput(userInput);

    if (isValidInput(sanitizedInput)) {
      form.submit();
    } else {
      alert("Invalid input. Please enter only letters.");
    }
  });

  function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z]/g, "");
  }

  function isValidInput(input) {
    return input !== "";
  }
});
