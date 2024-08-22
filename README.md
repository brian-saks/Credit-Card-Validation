
# 💳 Credit Card Validation App

This is a simple web application for credit card validation. It consists of a single application file that serves as both the frontend and backend.


## About
This is a personal proyect used to practise Node.js
The main focus was on the use of Backend API.

The credit card validation process used involves checking the following:

- The expiry date of the credit card (year and month) must be AFTER present time.
- The CVV (security code) of the credit card must be exactly 3 digits long unless it’s an American Express card, in which case the CVV must be exactly 4 digits long. American Express are cards whose PAN (card numbers) starts with either “34” or “37”.
- The PAN (card number) is between 16 and 19 digits long.
- Last digit of the PAN (card number) is checked using Luhn’s Algorithm.

The [Luhn’s Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) is a simple checksum formula used to validate identification numbers. It works by reversing the number, doubling every second digit, subtracting 9 from any result higher than 9, and summing all the digits. If the total is divisible by 10, the number is valid

## Prerequisites
- Node.js (version 18.16.0) 
- npm (version 9.5.1) 

## Installation
Clone the repository 

        git clone https://github.com/brian-saks/Credit-Card-Validation
 

Navigate to the project directory 
    
        cd credit-card-validation

Install the dependencies 
            
        npm install


## Usage
Start the application

        node index.js 

Open a web browser at 
        
        http://localhost:3000 

Enter credit card information in the provided form and submit for validation.

## Notes
- The application uses the Express.js framework to handle HTTP requests and serve static files. 
- The "index.html" file contains the HTML structure of the page. 
- The "styles.css" file contains the CSS styles for the page. 
- The "app.js" file contains the server-side logic and API endpoints for credit card validation. 
- The backend server runs on port 3000 by default. If you need to change the port, modify the "PORT" variable in "index.js".
