// index.js

// Set default value
document.getElementById('textInput').value = 10;
document.getElementById('rangeInput').value = 10;

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lastPassword");
  if (saved) {
    document.getElementById("generatePassword").value = saved;
    showStrength(saved);
  }
});

function updateTextInput(val) {
  document.getElementById("textInput").value = val;
  generateNewPassword();
}

function updateRangeInput(val) {
  document.getElementById("rangeInput").value = val;
  generateNewPassword();
}

function togglePasswordVisibility() {
  const field = document.getElementById("generatePassword");
  field.type = field.type === "password" ? "text" : "password";
}

function generateNewPassword() {
  const length = parseInt(document.getElementById("textInput").value);
  const useUppercase = document.getElementById("uppercase").checked;
  const useLowercase = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let allChars = "";
  if (useUppercase) allChars += uppercaseChars;
  if (useLowercase) allChars += lowercaseChars;
  if (useNumbers) allChars += numberChars;
  if (useSymbols) allChars += symbolChars;

  if (allChars === "") {
    alert("Please select at least one character type.");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  document.getElementById("generatePassword").value = password;
  localStorage.setItem("lastPassword", password);
  showStrength(password);
}

function showStrength(password) {
  const strengthIndicator = document.getElementById("strengthIndicator");
  let strength = 0;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  const strengths = ["Very Weak", "Weak", "Medium", "Strong"];
  const colors = ["red", "orange", "blue", "green"];

  strengthIndicator.innerText = strengths[strength - 1] || "";
  strengthIndicator.style.color = colors[strength - 1] || "";
  strengthIndicator.style.marginTop = "0.5rem";
  strengthIndicator.style.fontWeight = "bold";
}

function copyPassword() {
  const passwordField = document.getElementById("generatePassword");
  navigator.clipboard.writeText(passwordField.value);

  const toast = document.createElement("div");
  toast.innerText = "Password Copied!";
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#4CAF50";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}
