// console.log("bartr js loaded");

// var form  = document.getElementsByTagName('form')[0];
// var password = document.getElementById("password");
// var passwordMatch = document.getElementById("passwordMatch");
// var email = document.getElementById('email');
// var error = document.querySelector('.error');


// email.addEventListener("input", function (event) {
//   // Each time the user types something, we check if the
//   // email field is valid.
//   console.log(email)
//   if (email.validity.valid) {
//     // In case there is an error message visible, if the field
//     // is valid, we remove the error message.
//     error.innerHTML = ""; // Reset the content of the message
//     error.className = "error"; // Reset the visual state of the message
//   }
// }, false);
// form.addEventListener("submit", function (event) {
//   // Each time the user tries to send the data, we check
//   // if the email field is valid.
//   if (!email.validity.valid) {
    
//     // If the field is not valid, we display a custom
//     // error message.
//     error.innerHTML = "I expect an e-mail, darling!";
//     error.className = "error active";
//     // And we prevent the form from being sent by canceling the event
//     event.preventDefault();
//   };
// }, false);