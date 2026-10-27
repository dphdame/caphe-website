/**
 * CAPHE Methods Lab - Open Public Access
 * All 30 Methods Lab modules are openly available to the public without login gates.
 */
(function () {
  document.documentElement.classList.remove('access-locked');
  const existingGate = document.getElementById('access-preview-gate');
  if (existingGate) {
    existingGate.remove();
  }
})();
