const email = document.getElementById("mail");

email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I am expecting an e-mail address!");
        email.reportValidity();
    } else {
        email.setCustomValidity("Your email should be an email");
    }
});
