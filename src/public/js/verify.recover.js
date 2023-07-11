  // Obtener el elemento con el ID "myElement"
const tokenExpirationElement = document.getElementById('tokenExpiration');
console.log(tokenExpirationElement);

// Obtener el valor del parámetro almacenado en el atributo "data-myparam"
const tokenExpiration = tokenExpirationElement.getAttribute('data-myparam');
console.log(tokenExpiration)

//const tokenExpiration = {{tokenExpiration}}; // Obtener el valor de tokenExpiration del motor de plantillas

// Almacenar el valor de tokenExpiration en el almacenamiento local
localStorage.setItem('tokenExpiration', tokenExpiration);

function startTimer(duration, minutesDisplay, separatorDisplay, secondsDisplay) {
  let timer = duration;
  let minutes, seconds;

  const intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds;

    if (--timer < 0) {
      // Aquí puedes agregar el código a ejecutar cuando el temporizador llegue a cero
      clearInterval(intervalId);

      minutesDisplay.textContent  = '';
      separatorDisplay.textContent  = 'expired';
      secondsDisplay.textContent  = '';

      separatorDisplay.style.color = 'red';

      return;
    }
  }, 1000);
}

window.onload = function () {
  const minutesDisplay = document.getElementById('minutes');
  const separatorDisplay = document.getElementById('separator');
  const secondsDisplay = document.getElementById('seconds');
  const tokenExpiration = parseInt(localStorage.getItem('tokenExpiration')); // Obtener el tiempo de expiración del token almacenado

  if (tokenExpiration) {
    const currentTime = Math.floor(Date.now() / 1000); // Obtener la hora actual en segundos
    const remainingSeconds = Math.max(0, tokenExpiration - currentTime);
    startTimer(remainingSeconds, minutesDisplay, separatorDisplay,secondsDisplay);
  }

  function submitForm(event) {
    event.preventDefault();
    const tokenInputs = document.querySelectorAll('#verifyForm .form-control:not(#token)');
    const tokenValue = Array.from(tokenInputs).map(input => input.value).join('');
    document.getElementById('token').value = tokenValue;
    document.getElementById('verifyForm').submit();
  }

  // Asignar la función al evento 'click' del botón "Continue"
  const continueButton = document.getElementById('continueButton');
  continueButton.addEventListener('click', submitForm);
};
