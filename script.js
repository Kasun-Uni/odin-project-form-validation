const form = document.getElementById("signup-form");

const email = document.getElementById("email");
const country = document.getElementById("country");
const postalCode = document.getElementById("postal-code");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const emailError = document.getElementById("email-error");
const countryError = document.getElementById("country-error");
const postalCodeError = document.getElementById("postal-code-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

// Generic helper: mark a field as valid or invalid
function setFieldStatus(field, errorElement, isValid, message) {
  if (isValid) {
    field.classList.remove("invalid");
    field.classList.add("valid");
    errorElement.textContent = "";
  } else {
    field.classList.remove("valid");
    field.classList.add("invalid");
    errorElement.textContent = message;
  }
}

// Placeholder validators - real logic added in Step 5
function validateEmail() {
  console.log("validateEmail called");
}

function validateCountry() {
  console.log("validateCountry called");
}

function validatePostalCode() {
  console.log("validatePostalCode called");
}

function validatePassword() {
  console.log("validatePassword called");
}

function validateConfirmPassword() {
  console.log("validateConfirmPassword called");
}