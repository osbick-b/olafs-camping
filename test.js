const price = document.querySelector("#price");
const output = document.querySelector(".price-output");

output.textContent = price.value;

price.addEventListener("input", function() {
    output.textContent = price.value;
});

// =============================================================================
// Date thing
// =============================================================================

const controlledDateInput = document.querySelector("#date-today");
const todayDisplay = document.querySelector("#show-today");

const dateOffsetInput = document.querySelector("#date-in-x-days");
// --- HTML custom attributes ref - https://timnwells.medium.com/custom-attributes-in-html-correctly-681c014a4295
// --- accessing data: elementName.dataset.customAttributeName
// --- you have to convert case (it parses automatically. eg. data-x-days-offset ---> xDaysOffset)
console.log(`dateOffsetInput.xDays`, dateOffsetInput.dataset.xDaysOffset);



// --- Date offset fn
const today = new Date();
function addDays(numDays, date = today) {
    // console.log(`date`, date);
    date.setDate(date.getDate() + numDays); // ! -- this alters the value of _date_
    // console.log(`date AFTER`, date);
    return date;
}

console.log(`addDays(7)`, addDays(7));

// controlledDateInput.min = today.toISOString().split("T")[0]; // uses "T" as el separator and picks the 1st el [0];

// todayDisplay.textContent = [today, inAWeek];
