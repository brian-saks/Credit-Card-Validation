
const cardNumberInput = document.querySelector("#number-input");
const cardNumberDisplay = document.querySelector("#number-display");

const cardHolderInput = document.querySelector("#name-input");
const cardHolderDisplay = document.querySelector("#name-display");

const cardExpirationInput = document.querySelector("#date-input");
const cardExpirationDisplay = document.querySelector("#date-display");

const cvvInput = document.querySelector("#cvv-input");


cardNumberInput.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardNumberDisplay.innerText = "XXXX XXXX XXXX XXXX";
    } else {
        const valuesOfInput = e.target.value.replaceAll(" ", "");

        if (e.target.value.length > 14) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
            cardNumberDisplay.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
        } else if (e.target.value.length > 9) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
            cardNumberDisplay.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
        } else if (e.target.value.length > 4) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
            cardNumberDisplay.innerHTML = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
        } else {
            cardNumberDisplay.innerHTML = valuesOfInput;
        }
    }
})

cardHolderInput.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardHolderDisplay.innerHTML = "BRIAN LUCAS SAKS GRIGA";
    } else {
        cardHolderDisplay.innerHTML = e.target.value.toUpperCase();
    }
})

cardExpirationInput.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardExpirationDisplay.innerHTML = "MM/YY";
    } else {
        const valuesOfInput = e.target.value.replace("/", "");

        if (e.target.value.length > 2) {
            e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
            cardExpirationDisplay.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        } else {
            cardExpirationDisplay.innerHTML = valuesOfInput;
        }
    }
})




const form = document.querySelector("#input-form");

form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const creditCardData = {
      cardNumber: cardNumberInput.value,
      expiryDate: cardExpirationInput.value,
      cvv: cvvInput.value,
      holder: cardHolderInput.value,
    };
  
    fetch('/api/validate-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creditCardData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'VALIDATION SUCCESSFUL') {
            document.querySelector("#validation-image").src = 'green_tick.webp';
            document.querySelector("#validation-image").style.height = '13%';
            document.querySelector("#validation-image").style.display = 'block';
        } else {
            document.querySelector("#validation-image").src = 'red_cross.png';
            document.querySelector("#validation-image").style.display = 'block';
        }
      })
      .catch(error => {
        console.error(error);
      });
  });



let cancelButton = document.querySelector("#btn-cancel");

cancelButton.addEventListener("click", function(){ 
    form.reset();
    cardNumberDisplay.innerText = "XXXX XXXX XXXX XXXX";
    cardExpirationDisplay.innerHTML = "MM/YY";
    cardHolderDisplay.innerHTML = "BRIAN LUCAS SAKS GRIGA";
    document.querySelector("#validation-image").style.display = 'none';
});
