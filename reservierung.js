// import preiseList from "./preise.json" assert {type:"json"};

// =============================================================================
//! --- Temporary solution, wont create virtual server just now
const preisList = {
    erwachsen: 11,
    kind: 7,
    hund: 1.5,
    zelt: 3,
    kfz: 3,
    wohnomobil: 5,
    motorrad: 2,
};

const conditions = {
    maxStayLength: 99 // in days
};
// =============================================================================
// DATES VARIABLES

const anreise = document.querySelector("#anreise");
const abreise = document.querySelector("#abreise");
const dauer = document.querySelector("#dauer");

const today = new Date();
let anrDate;
let abrDate;
// =============================================================================
// PRICES VARIABLES

const itemsReservAll = document.querySelectorAll("input.itemReserv");
const summeDispl = document.querySelector("#summeDispl");
const summeInput = document.querySelector("#summe");

console.log(`itemsReservAll`, itemsReservAll);

// =============================================================================
// INITIALIZATION FUNCTIONS

setInitialValues();

// =============================================================================
//! =============================================================================
// PRICES ETC

//FNS
function calcDiscount(typePerson, days) {

}

function calcTotal() {
    console.log(">> CALC TOTAL");
let summe = 0;
let dauerLength = getStayLength();
console.log(`dauerLength`, dauerLength);
    itemsReservAll.forEach((item) => {
        let itemTotal = item.value * preisList[item.name] * dauerLength;
        summe += itemTotal;
        // console.log(
        //     item.name,
        //     `preis ${preisList[item.name]} = itemTotal ${itemTotal}`
        // );
    });
    summeInput.value = summe;
    summeDispl.textContent = summe;
    return summe;
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================
// PRICES
itemsReservAll.forEach((item) => {
    item.addEventListener("input", ({target}) => {
        console.log(">> input changed",
            target.name,
            target.value,
            " preis je >",
            preisList[target.name]
        );
        console.log(
            target.name,
            " preis insgesamt >",
            target.value * preisList[target.name]
        );
        calcTotal();
        
    });
});

// !=============================================================================

// =============================================================================
//DATES

anreise.addEventListener("input", () => {
    anrDate = new Date(anreise.value);
    while (!dateValidation(anreise.value, abreise.value)) {
        updateAbreise(anreise);
    }
    dauer.textContent = getStayLength();
    calcTotal();
    return anrDate;
});

abreise.addEventListener("input", () => {
    dateValidation(anreise.value, abreise.value)
        ? (abrDate = new Date(abreise.value))
        : updateAbreise(anreise);
    // console.log(`INPUT >>> abrDate`, abrDate);
    dauer.textContent = getStayLength();
    calcTotal();
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
    console.log(">> SET INITIAL VALUES");
    //Dates
    anreise.value = htmlDateFormat(today);
    updateAbreise(anreise);
    anreise.min = htmlDateFormat(today);
    anrDate = new Date(anreise.value);
    dauer.textContent = getStayLength();
    //Preise
    itemsReservAll.forEach((item) => {
        item.min = item.min || 0;
        item.value=item.min;
        // item.name === "erwachsen"? item.value=1 : item.value=0;
    });
    calcTotal();
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
// function getStayLength(iniDate, endDate) {
//     return Math.ceil((endDate.getTime() - iniDate.getTime()) / (1000 * 3600 * 24)); // difference abreise-anreise convert from ms to days
// }
function getStayLength() {
    return Math.ceil((abrDate.getTime() - anrDate.getTime()) / (1000 * 3600 * 24)); // difference abreise-anreise convert from ms to days
}

function updateAbreise(anreise) {
    abreise.value = htmlDateFormat(getNextDay(anreise.value));
    abreise.min = htmlDateFormat(getNextDay(anreise.value));
    abrDate = new Date(abreise.value);
    // console.log(`UPD ABR >> abrDate`, abrDate);
}

function dateValidation(iniDate, endDate) {
    endDate > iniDate? console.log("valid ✅"): console.log("not valid ⛔");
    return endDate > iniDate;
}

function htmlDateFormat(date) {
    return date.toISOString().split("T")[0];
}

// =============================================================================
