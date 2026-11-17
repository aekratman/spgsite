const CORRECT_PIN = "01221896";
const STORAGE_KEY = "wr_internal_notes_unlocked";

function isSessionUnlocked() {
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}

function applySecretState() {
  if (isSessionUnlocked()) {
    document.body.classList.add("secret-unlocked");
  } else {
    document.body.classList.remove("secret-unlocked");
  }
}

// Apply state immediately on page load and after layout.js injects navcorner.html
document.addEventListener("DOMContentLoaded", applySecretState);
window.addEventListener("layoutReady", applySecretState);

function openModal(event) {
  if (event) event.preventDefault();
  showMenu();
  const overlay = document.getElementById("secretOverlay");
  if (overlay) overlay.classList.add("active");
}

function closeModal() {
  const overlay = document.getElementById("secretOverlay");
  if (overlay) overlay.classList.remove("active");
}

function switchView(viewId) {
  const targetView = document.getElementById(viewId);
  if (!targetView) return;
  document.querySelectorAll(".modal-view").forEach(v => v.classList.remove("active"));
  targetView.classList.add("active");
}

function showMenu() {
  switchView("menu-view");
}

function showPasscodeScreen() {
  if (isSessionUnlocked()) {
    applySecretState();
    switchView("notes-view");
  } else {
    switchView("passcode-view");
    const inputs = document.querySelectorAll(".pin-input");
    inputs.forEach(i => i.value = "");
    const errorMsg = document.getElementById("errorMsg");
    if (errorMsg) errorMsg.style.visibility = "hidden";
    if (inputs.length > 0) inputs[0].focus();
  }
}

function moveNext(input, index) {
  const inputs = document.querySelectorAll(".pin-input");
  if (input.value.length > 1) input.value = input.value.slice(0, 1);

  if (input.value !== "" && index < inputs.length - 1) {
    inputs[index + 1].focus();
  }

  const enteredPin = Array.from(inputs).map(i => i.value).join("");
  if (enteredPin.length === CORRECT_PIN.length) {
    if (enteredPin === CORRECT_PIN) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      applySecretState();
      switchView("notes-view");
    } else {
      const errorMsg = document.getElementById("errorMsg");
      if (errorMsg) errorMsg.style.visibility = "visible";
      inputs.forEach(i => i.value = "");
      if (inputs.length > 0) inputs[0].focus();
    }
  }
}

function handleBackspace(event, index) {
  const inputs = document.querySelectorAll(".pin-input");
  if (event.key === "Backspace" && inputs[index].value === "" && index > 0) {
    inputs[index - 1].focus();
  }
}

function lockNotes() {
  sessionStorage.removeItem(STORAGE_KEY);
  applySecretState();
  closeModal();
}
