const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { lutimes } = require("fs");

const app = express();

app.use(bodyParser.json());

// Serve static files

app.use(express.static(__dirname));

// Handle requests for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the index.html file as the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/validate-card", (req, res) => {
  // Retrieve credit card details from the request body
  const { cardNumber, expiryDate, cvv, holder } = req.body;

  // Log the received data
  console.log('\n');
  console.log("Received Card Number:", cardNumber);
  console.log("Received Expire Date:", expiryDate);
  console.log("Received CVV Number:", cvv);
  console.log("Received Card Holder:", holder);

  // ------------| VALIDATION CHECKS |------------ //

  //PAN Validation: between 16 and 19 digits long (only checking for < 19)
  const cardNumberLength = cardNumber.length;
  if (cardNumberLength < 19) {
    console.log("VALIDATION FAILED: Invalid Card Number");
    return res.status(400).json({ message: "VALIDATION FAILED: Invalid Card Number" });
  }
  
  //Expiry Date Validation: should be after the present time
  const presentTime = new Date();
  const expiryDateParts = expiryDate.split("/");
  const expiryMonth = parseInt(expiryDateParts[0]);
  const expiryYear = parseInt(expiryDateParts[1]) + 2000; // Assuming two-digit year format
  const expiryDateObj = new Date(expiryYear, expiryMonth - 1);
  if (expiryDateObj <= presentTime) {
    console.log("VALIDATION FAILED: Expired Date");
    return res.status(400).json({ message: "VALIDATION FAILED: Invalid Expire Date" });
  }

  //CVV Validation: length should be 3 for most cards, 4 for American Express (starting with 34 or 37)
  let cvvLength = 3;
  if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
    cvvLength = 4;
  }
  if (cvv.length !== cvvLength) {
    console.log("VALIDATION FAILED: Invalid CVV Number");
    return res.status(400).json({ message: "VALIDATION FAILED: Invalid CVV Number" });
  }


  //Luhn Algorithm Validation
  let luhnAlgorithmValidation = LuhnAlgorithm(cardNumber);
  if (!luhnAlgorithmValidation) {
    console.log("VALIDATION FAILED: Failed Luhn Algorithm Validation");
    return res.status(400).json({ message: "VALIDATION FAILED: Failed Luhn Algorithm Validation" });
  }


  // If all checks pass, return success
  console.log("VALIDATION SUCCESSFUL");
  return res.status(200).json({ message: "VALIDATION SUCCESSFUL" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("\n");
    console.log("SERVER RUNNING AT: http://localhost:3000/ \n");
});






function LuhnAlgorithm(creditCardNumber) {
  // Remove spaces characters from the input
  const sanitizedNumber = creditCardNumber.replace(/\s/g, "");

  // Reverse the digits of the sanitized number
  const reversedNumber = sanitizedNumber.split('').reverse().join('');

  let sum = 0;
  for (let i = 0; i < reversedNumber.length; i++) {
    let digit = parseInt(reversedNumber[i]);

    // Double every second digit
    if (i % 2 !== 0) {
      digit *= 2;

      // Subtract 9 if the doubled digit is greater than 9
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  // Check if the sum is divisible by 10
  return sum % 10 === 0;
}