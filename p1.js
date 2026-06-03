
// Toggle between forms
const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
document.getElementById("toSignIn").onclick = () => {
  signUpForm.classList.remove("active");
  signInForm.classList.add("active");
};
document.getElementById("toSignUp").onclick = () => {
  signInForm.classList.remove("active");
  signUpForm.classList.add("active");
};

// Validation helpers
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function validatePassword(password) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

// Real-time validation for Sign Up
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const confirmPassword = document.getElementById("confirmPassword");
const signUpBtn = document.getElementById("signUpBtn");

const passwordHelp = document.getElementById("passwordHelp");

function checkSignUpValidity() {
  let validEmail = validateEmail(signUpEmail.value);
  let validPassword = validatePassword(signUpPassword.value);
  let passwordsMatch = signUpPassword.value === confirmPassword.value;

  signUpEmail.className = validEmail ? "valid" : "invalid";
  signUpPassword.className = validPassword ? "valid" : "invalid";
  confirmPassword.className = passwordsMatch ? "valid" : "invalid";

  // Update password help text color
  if (signUpPassword.value.length > 0) {
    passwordHelp.className = validPassword
      ? "help-text valid"
      : "help-text invalid";
  } else {
    passwordHelp.className = "help-text";
  }

  signUpBtn.disabled = !(validEmail && validPassword && passwordsMatch);
}

// Override simulateSubmit for Sign Up
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  simulateSubmit(signUpForm, signUpBtn, "Account created successfully");

  // After success, switch to Sign In automatically
  setTimeout(() => {
    signUpForm.classList.remove("active");
    signInForm.classList.add("active");
  }, 2500); // wait for success message before switching
});

signUpEmail.addEventListener("input", checkSignUpValidity);
signUpPassword.addEventListener("input", checkSignUpValidity);
confirmPassword.addEventListener("input", checkSignUpValidity);

// Sign In validation
const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signInBtn = document.getElementById("signInBtn");

function checkSignInValidity() {
  let validEmail = validateEmail(signInEmail.value);
  let validPassword = signInPassword.value.length >= 8;
  signInEmail.className = validEmail ? "valid" : "invalid";
  signInPassword.className = validPassword ? "valid" : "invalid";
  signInBtn.disabled = !(validEmail && validPassword);
}

signInEmail.addEventListener("input", checkSignInValidity);
signInPassword.addEventListener("input", checkSignInValidity);

// Show/hide password toggle
// function addPasswordToggle(inputId) {
//   const input = document.getElementById(inputId);
//   const toggle = document.createElement("span");
//   toggle.textContent = "👁️";
//   toggle.style.cursor = "pointer";
//   toggle.onclick = () => {
//     input.type = input.type === "password" ? "text" : "password";
//   };
//   input.insertAdjacentElement("afterend", toggle);
// }
// addPasswordToggle("signUpPassword");
// addPasswordToggle("confirmPassword");
// addPasswordToggle("signInPassword");

// Simulate API call with loading + success
function simulateSubmit(form, button, successMessage) {
  button.disabled = true;
  const loader = document.createElement("div");
  loader.className = "loading";
  form.appendChild(loader);

  setTimeout(() => {
    loader.remove();
    const msg = document.createElement("p");
    msg.className = "success";
    msg.textContent = successMessage;
    form.appendChild(msg);
    button.disabled = false;
  }, 1000); // 1s fake API delay
}