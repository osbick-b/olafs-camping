const anreise = document.querySelector("#anreise");
const abreise = document.querySelector("#abreise");
const dauer = document.querySelector("#dauer");

const today = new Date();
const tomorrow = getNextDay(today);


//* --- Initial values:
//* Date obj format has to be converted to 2022-07-01 format for use in HTML side
anreise.value = today.toISOString().split("T")[0];
abreise.value = tomorrow.toISOString().split("T")[0];
// console.log(`anreise.value`, anreise.value);
// console.log(`today`, today);
// console.log(`tomorrow`, tomorrow);
// =============================================================================

let anrDate = new Date(anreise.value);
let abrDate = new Date(abreise.value);
dauer.textContent = getDauerTage();

anreise.addEventListener("input", () => {
    console.log(`INPUT >>> anreise.value`, anreise.value);
    anrDate = new Date(anreise.value);
    console.log(`INPUT >>> anrDate`, anrDate);
    if (abreise.value <= anreise.value) { 
        console.log("NEGATIVE DATE!!!!");
        updateAbreise(anreise); //TODO -- add conditional updating. you just want to redefine if abreise is invalid
    }
    // abreise.value = getNextDay(anreise.value).toISOString().split("T")[0];
    dauer.textContent = getDauerTage();
    return anrDate;
});

abreise.addEventListener("input", () => {
    console.log(`INPUT >>> abreise.value`, abreise.value);
    abrDate = new Date(abreise.value);
    if (abreise.value <= anreise.value) { console.log("NEGATIVE DATE!!!!");}
    dauer.textContent = getDauerTage();
    console.log(`INPUT >>> abrDate`, abrDate);
    return abrDate;
});

console.log(`anrDate`, anrDate);
console.log(`abrDate`, abrDate);



// =============================================================================
// FUNCTIONS
// =============================================================================
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
    abreise.value = getNextDay(anreise.value).toISOString().split("T")[0];
    abrDate = new Date(abreise.value);
}

function dateValidation() {
    
}

// =============================================================================