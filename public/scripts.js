const emailInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');
const nameInput = document.querySelector('input[name="name"]');
const companyInput = document.querySelector('input[name="company"]');

const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const nameError = document.querySelector(".name-error");
const companyError = document.querySelector(".company-error");

function validateLoginForm() {
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  // Check if email or password is empty
  if (emailValue === "" || passwordValue === "") {
    if (emailValue === "") {
      emailError.textContent = "Email cannot be empty";
    } else {
      emailError.textContent = "";
    }

    if (passwordValue === "") {
      passwordError.textContent = "Password cannot be empty";
    } else {
      passwordError.textContent = "";
    }

    return; // Prevent form submission if fields are empty
  }

  // // Check for valid email format
  // if (!isValidEmail(emailValue)) {
  //   emailError.textContent = "Invalid email address";
  //   return;
  // } else {
  //   emailError.textContent = "";
  // }

  // // Check for password requirements (at least 6 characters and one number)
  // if (!isValidPassword(passwordValue)) {
  //   passwordError.textContent =
  //     "Password must be at least 6 characters long and contain at least one number";
  //   return;
  // } else {
  //   passwordError.textContent = "";
  // }

  // If all validations pass, submit the form
  alert("User " + emailValue + "Logged in!");
  document.getElementById("loginForm").submit();
}

function validateSignUpForm(event) {
  event.preventDefault();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const nameValue = nameInput.value.trim();
  const companyValue = companyInput.value.trim();

  // Check if name is empty or less than 3 characters
  if (nameValue === "" || nameValue.length < 3) {
    nameError.textContent = "Name must be at least 3 characters long";
    return;
  } else {
    nameError.textContent = "";
  }

  // Check if company is empty or less than 5 characters
  if (companyValue === "" || companyValue.length < 5) {
    companyError.textContent = "Company must be at least 5 characters long";
    return;
  } else {
    companyError.textContent = "";
  }

  // Check if email or password is empty
  if (emailValue === "" || passwordValue === "") {
    if (emailValue === "") {
      emailError.textContent = "Email cannot be empty";
    } else {
      emailError.textContent = "";
    }

    if (passwordValue === "") {
      passwordError.textContent = "Password cannot be empty";
    } else {
      passwordError.textContent = "";
    }

    return; // Prevent form submission if fields are empty
  }

  // Check for valid email format
  if (!isValidEmail(emailValue)) {
    emailError.textContent = "Invalid email address";
    return;
  } else {
    emailError.textContent = "";
  }

  // Check for password requirements (at least 6 characters and one number)
  if (!isValidPassword(passwordValue)) {
    passwordError.textContent =
      "Password must be at least 6 characters long and contain at least one number";
    return;
  } else {
    passwordError.textContent = "";
  }

  // If all validations pass, submit the form
  document.getElementById("signUpForm").submit();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 6 && /\d/.test(password);
}
