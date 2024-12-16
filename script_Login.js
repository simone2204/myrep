// VALIDAZIONE EMAIL ADDRESS E PASSWORD DI LOGIN
function validation(event) {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  if (!email.value || !password.value) {
    alert("Please enter valid input");
    event.preventDefault();
    return;
  }
  // Controllo formato email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    alert("Per favore inserisci un'email valida.");
    event.preventDefault();
    return;
  }

  // Controllo password (ad esempio, lunghezza minima)
  if (password.value.length < 6) {
    alert("La password deve contenere almeno 6 caratteri.");
    event.preventDefault();
    return;
  }
}
const form = document.querySelector('#Form-1');
form.addEventListener("submit", validation);
//----------------------------------------------------------
