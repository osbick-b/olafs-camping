const price = document.querySelector("#price");
const output = document.querySelector(".price-output");

output.textContent = price.value;

price.addEventListener("input", function() {
    output.textContent = price.value;
});

// =============================================================================
// Date thing --- input condition based on date offset (eg. 7 days from now)
// =============================================================================

const controlledDateInputToday = document.querySelector("#date-today");
const controlledDateInputOffset = document.querySelector("#date-in-x-days");
const todayDisplay = document.querySelector("#show-today");
const offsetDisplay = document.querySelector(".offset-num");
const today = new Date();

const dateOffset =
    +document.querySelector("#date-in-x-days").dataset.xDaysOffset; // ! ---> gotta convert to INT!!!!
// --- HTML custom attributes ref - https://timnwells.medium.com/custom-attributes-in-html-correctly-681c014a4295
// --- accessing data: elementName.dataset.customAttributeName
// --- you have to convert case (it parses automatically. eg. data-x-days-offset ---> xDaysOffset)


// --- Date offset fn
function addDays(numDays = today = new Date()) {
    const dateCopy = new Date(today.getTime()); // -- you gotta create a copy, otherwise it mutates the original Date object (today)
    // console.log(`today`, today);
    dateCopy.setDate(dateCopy.getDate() + numDays); // ! -- this alters the value of _date_
    // console.log(`today AFTER`, today);
    return dateCopy;
}
// --- RES --- JS Date thing https://bobbyhadz.com/blog/javascript-date-add-weeks

console.log(`today`, today);
console.log(`addDays()`, addDays(dateOffset));
console.log(`today AFTER`, today);

controlledDateInputToday.min = today.toISOString().split("T")[0]; // uses "T" as el separator and picks the 1st el [0];
controlledDateInputOffset.min = addDays(dateOffset).toISOString().split("T")[0];

todayDisplay.textContent = today;
offsetDisplay.textContent = dateOffset;
