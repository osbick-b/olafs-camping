// import preiseList from "./preise.json" assert {type:"json"};

// =============================================================================
//! --- Temporary solution, wont create virtual server just now
const preis = {
    erwachsen: 11,
    kind: 7,
    hund: 1.5,
    zelt: 3,
    kfz: 3,
    wohnomobil: 5,
    motorrad: 2,
};
// =============================================================================

const anreise = document.querySelector("#anreise");
const abreise = document.querySelector("#abreise");
const dauer = document.querySelector("#dauer");

const today = new Date();
let anrDate;
let abrDate;

setInitialValues();

// =============================================================================
// PRICES VARIABLES

const preisVariable = document.querySelectorAll("input.people");
const preisFixed = document.querySelectorAll("input.item");
console.log(`preisVariable`, preisVariable);
console.log(`preisFixed`, preisFixed);
// =============================================================================

// PRICES ETC







// =============================================================================
// EVENT LISTENERS
// =============================================================================

anreise.addEventListener("input", () => {
    anrDate = new Date(anreise.value);
    dateValidation(anreise.value, abreise.value) || updateAbreise(anreise); // has to be with values bc if input vals are not valid, they shouldnt be passed onto the variable
    // console.log(`INPUT >>> anrDate`, anrDate);
    dauer.textContent = getDauerTage();
    return anrDate;
});

abreise.addEventListener("input", () => {
    dateValidation(anreise.value, abreise.value)
        ? (abrDate = new Date(abreise.value))
        : updateAbreise(anreise);
    // console.log(`INPUT >>> abrDate`, abrDate);
    dauer.textContent = getDauerTage();
    return abrDate;
});

// console.log(`anrDate`, anrDate);
// console.log(`abrDate`, abrDate);

// =============================================================================





// =============================================================================
// FUNCTIONS
// =============================================================================

// FOR PRICE CALCULATION


// =============================================================================

// FOR DATES AND SO

//* --- Initial values: Date obj format has to be converted to 2022-07-01 format for use in HTML side
function setInitialValues() {
    anreise.value = htmlDateFormat(today);
    updateAbreise(anreise);
    anreise.min = htmlDateFormat(today);
    anrDate = new Date(anreise.value);
    dauer.textContent = getDauerTage();
}

function getNextDay(day, distance = 1) {
    if (typeof(day) !== "object") {
        day = new Date(day);
    }
    const nextDay = new Date(day.getTime());
    nextDay.setDate(nextDay.getDate() + distance);
    return nextDay;
}

// Generic version of fn:
// function getDauerTage(iniDate, endDate) {
//     return Math.ceil((endDate.getTime() - iniDate.getTime()) / (1000 * 3600 * 24)); // difference abreise-anreise convert from ms to days
// }
function getDauerTage() {
    return Math.ceil((abrDate.getTime() - anrDate.getTime()) / (1000 * 3600 * 24)); // difference abreise-anreise convert from ms to days
}

function updateAbreise(anreise) {
    abreise.value = htmlDateFormat(getNextDay(anreise.value));
    abreise.min = htmlDateFormat(getNextDay(anreise.value));
    abrDate = new Date(abreise.value);
    // console.log(`UPD ABR >> abrDate`, abrDate);
}

function dateValidation(iniDate, endDate) {
    endDate >= iniDate? console.log("valid ✅"): console.log("not valid ⛔");
    return endDate >= iniDate;
}

function htmlDateFormat(date) {
    return date.toISOString().split("T")[0];
}

// =============================================================================
