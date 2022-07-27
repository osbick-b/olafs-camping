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
// =============================================================================
setInitialValues();

// =============================================================================
// EVENT LISTENERS
// =============================================================================
// PRICES
itemsReservAll.forEach((item) => {
    item.addEventListener("input", ({target}) => {
        calcTotal();
    });
});

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

// =============================================================================
// FUNCTIONS
// =============================================================================
// FOR PRICE CALCULATION

function calcDiscount(item, days) {
    console.log(">> CALC DISCOUNT", item.name, days);
    let itemPrice;
    if (days === 1) {
        itemPrice = preisList[item.name];
    } else if (days === 2) {
        itemPrice = preisList[item.name] - 1;
    } else if (days >= 3) {
        itemPrice = preisList[item.name] - 2;
    }
    return itemPrice;
}

function calcTotal() {
    clearPreview();
    console.log(">> CALC TOTAL");
    let summe = 0;
    let dauerLength = getStayLength();
    itemsReservAll.forEach((item) => {
        if (item.value == 0) {
            return;
        }
        let itemPrice;
        itemPrice = item.dataset.hasDiscount
            ? calcDiscount(item, dauerLength)
            : preisList[item.name];
        let itemTotal = item.value * itemPrice * dauerLength;
        summe += itemTotal;
        previewReservation(item, itemPrice, itemTotal);
    });
    summeInput.value = summe;
    summeDispl.textContent = summe;
    return summe;
}

function previewReservation(item, itemPrice, itemTotal) {
    const li = document.createElement("li");
    const itemSummary = document.createTextNode(
        `${item.value} x ${item.name.toUpperCase()} (${itemPrice} eur) --- `
    );
    const span = document.createElement("span");
    span.className = "item-total";
    span.textContent = `${itemTotal} eur`;
    li.appendChild(itemSummary);
    li.appendChild(span);
    document.querySelector("#preview").appendChild(li);
}

function clearPreview() {
    // console.log(">> CLEAR PREVIEW");
    const summary = document.querySelector("section#summary");
    document.querySelector("#preview").remove();
    const newPreview = document.createElement("ul");
    newPreview.id = "preview";
    summary.insertBefore(newPreview, summary.children[1]); // insert after section title
}

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
