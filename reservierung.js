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
// CONTACT VARIABLES

const itemsContactAll = document.querySelectorAll("ol#contact input");

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

// =============================================================================
// VALIDATION VARIABLES

const btnSubmit = document.querySelector("#submit");
const inputAll = document.querySelectorAll("input");

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
        calcTotalPrice();
    });
});

// =============================================================================
// DATES
anreise.addEventListener("input", () => {
    anrDate = new Date(anreise.value);
    while (!dateValidation(anreise.value, abreise.value)) {
        updateAbreise(anreise);
    }
    dauer.textContent = getStayLength();
    calcTotalPrice();
    return anrDate;
});

abreise.addEventListener("input", () => {
    dateValidation(anreise.value, abreise.value)
        ? (abrDate = new Date(abreise.value))
        : updateAbreise(anreise);
    // console.log(`INPUT >>> abrDate`, abrDate);
    dauer.textContent = getStayLength();
    calcTotalPrice();
    return abrDate;
});
// =============================================================================
//!!! VALIDATION
inputAll.forEach(inp => {
        // inp.checkValidity() || console.log(inp.name, "⛔");
         inp.addEventListener("blur" ,() => {
            inp.className = inp.checkValidity() || "invalid";
        });
    });

// *** TUTORIAL ON FORM VALIDATION
//www.freecodecamp.org/news/learn-javascript-form-validation-by-making-a-form/

// =============================================================================
// FUNCTIONS
// =============================================================================
//!!! FOR VALIDATION & SUBMIT
function submitForm() {
    // validateSubmit();
    //TODO --- add screen to review reservation summary
}

// function validateSubmit() {
//     console.log("==> CLICKED SUBMIT");
//     inputAll.forEach((inp) => {
//         // inp.checkValidity() || console.log(inp.name, "⛔");
//         inp.className = inp.checkValidity() || "invalid";
//     });
// }


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

function calcTotalPrice() {
    clearSummary();
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
        overviewReservation(item, itemPrice, itemTotal);
    });
    summeInput.value = summe;
    summeDispl.textContent = summe + " eur";
    return summe;
}

// =============================================================================
// FOR RENDERING RESERVATION OVERVIEW

function overviewReservation(item, itemPrice, itemTotal) {
    const li = document.createElement("li");
    const itemSummary = document.createTextNode(
        `${item.value} x ${item.name.toUpperCase()} (${itemPrice} eur) --- `
    );
    const span = document.createElement("span");
    span.className = "item-total";
    span.textContent = `${itemTotal} eur`;
    li.appendChild(itemSummary);
    li.appendChild(span);
    document.querySelector("#summary").appendChild(li);
}

function clearSummary() {
    // console.log(">> CLEAR PREVIEW");
    const overview = document.querySelector("section#overview");
    document.querySelector("#summary").remove();
    const newSummary = document.createElement("ul");
    newSummary.id = "summary";
    overview.insertBefore(newSummary, overview.children[1]); // to insert summary after section title
}

// =============================================================================
// FOR DATES AND SO
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
}

function dateValidation(iniDate, endDate) {
    endDate > iniDate? console.log("dates valid ✅"): console.log("dates not valid ⛔");
    return endDate > iniDate;
}

function htmlDateFormat(date) {
    return date.toISOString().split("T")[0];
}

// =============================================================================
// SET INITIAL VALUES
//* --- Initial values: Date obj format has to be converted to 2022-07-01 format for use in HTML side
function setInitialValues() {
    console.log(">> SET INITIAL VALUES");
    //Contact
    itemsContactAll.forEach((item) => {
        item.value = item.value && "";
    });
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
    });
    calcTotalPrice();
}
// =============================================================================
