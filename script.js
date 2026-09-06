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

function validateEmail() {
  if (email.validity.valueMissing) {
    setFieldStatus(email, emailError, false, "Email is required.");
  } else if (email.validity.typeMismatch) {
    setFieldStatus(email, emailError, false, "Please enter a valid email address.");
  } else {
    setFieldStatus(email, emailError, true, "");
  }
}

function validateCountry() {
  if (country.validity.valueMissing) {
    setFieldStatus(country, countryError, false, "Please select a country.");
  } else {
    setFieldStatus(country, countryError, true, "");
  }
}

function validatePostalCode() {
  const value = postalCode.value.trim();
  // Simple generic rule: 3-10 alphanumeric characters (adjust per country later if needed)
  const postalRegex = /^[A-Za-z0-9\s-]{3,10}$/;

  if (value === "") {
    setFieldStatus(postalCode, postalCodeError, false, "Postal code is required.");
  } else if (!postalRegex.test(value)) {
    setFieldStatus(postalCode, postalCodeError, false, "Enter a valid postal code.");
  } else {
    setFieldStatus(postalCode, postalCodeError, true, "");
  }
}

function validatePassword() {
  if (password.validity.valueMissing) {
    setFieldStatus(password, passwordError, false, "Password is required.");
  } else if (password.validity.tooShort) {
    setFieldStatus(password, passwordError, false, "Password must be at least 8 characters.");
  } else {
    setFieldStatus(password, passwordError, true, "");
  }
  // Re-check confirm password whenever password changes
  if (confirmPassword.value !== "") {
    validateConfirmPassword();
  }
}

function validateConfirmPassword() {
  if (confirmPassword.value === "") {
    setFieldStatus(confirmPassword, confirmPasswordError, false, "Please confirm your password.");
  } else if (confirmPassword.value !== password.value) {
    setFieldStatus(confirmPassword, confirmPasswordError, false, "Passwords do not match.");
  } else {
    setFieldStatus(confirmPassword, confirmPasswordError, true, "");
  }
}

email.addEventListener("input", validateEmail);
email.addEventListener("blur", validateEmail);

country.addEventListener("change", validateCountry);
country.addEventListener("blur", validateCountry);

postalCode.addEventListener("input", validatePostalCode);
postalCode.addEventListener("blur", validatePostalCode);

password.addEventListener("input", validatePassword);
password.addEventListener("blur", validatePassword);

confirmPassword.addEventListener("input", validateConfirmPassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Re-run every validator, in case a field was never touched
  validateEmail();
  validateCountry();
  validatePostalCode();
  validatePassword();
  validateConfirmPassword();

  const isFormValid =
    email.validity.valid &&
    country.validity.valid &&
    postalCode.value.trim() !== "" &&
    /^[A-Za-z0-9\s-]{3,10}$/.test(postalCode.value.trim()) &&
    password.validity.valid &&
    confirmPassword.value === password.value &&
    confirmPassword.value !== "";

  let successMessage = document.querySelector(".success-message");
  let formErrorMessage = document.querySelector(".form-error-message");

  if (!isFormValid) {
    if (!formErrorMessage) {
      formErrorMessage = document.createElement("p");
      formErrorMessage.classList.add("form-error-message");
      form.appendChild(formErrorMessage);
    }
    formErrorMessage.textContent = "Please fix the errors above before submitting.";
    if (successMessage) successMessage.remove();
    return;
  }

  // All valid!
  if (formErrorMessage) formErrorMessage.remove();

  if (!successMessage) {
    successMessage = document.createElement("p");
    successMessage.classList.add("success-message");
    form.appendChild(successMessage);
  }
  successMessage.textContent = "🖐️ High five! Your form was submitted successfully.";
});
