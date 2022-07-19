const price = document.querySelector("#price");
const output = document.querySelector(".price-output");

output.textContent = price.value;

price.addEventListener("input", function() {
    output.textContent = price.value;
});

// Min date today
const controlledDateInput = document.querySelector("#date-today");
const todayDisplay = document.querySelector("#show-today");

const today = new Date().toISOString().split("T")[0]; // uses "T" as el separator and picks the 1st el [0]

controlledDateInput.min = today;

todayDisplay.textContent = today;