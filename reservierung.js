const anreise = document.querySelector("#anreise");
const abreise = document.querySelector("#abreise");
const dauer = document.querySelector("#dauer");

const today = new Date();
const tomorrow = new Date(today.getTime());
tomorrow.setDate(tomorrow.getDate() + 1);

//? --- Initial value: is it necessary? also maybe use this here for validation
anreise.value = today.toISOString().split("T")[0];
abreise.value = tomorrow.toISOString().split("T")[0];
// console.log(`anreise.value`, anreise.value);
// console.log(`today`, today);
// console.log(`tomorrow`, tomorrow);

let anrDate = new Date(anreise.value);
let abrDate = new Date(abreise.value);

anreise.addEventListener("input", () => {
    console.log(`INPUT >>> anreise.value`, anreise.value);
    anrDate = new Date(anreise.value);
    dauer.textContent = dauerTage();
    console.log(`INPUT >>> anrDate`, anrDate);
    return anrDate;
});

abreise.addEventListener("input", () => {
    console.log(`INPUT >>> abreise.value`, abreise.value);
    abrDate = new Date(abreise.value);
    dauer.textContent = dauerTage();
    console.log(`INPUT >>> abrDate`, abrDate);
    return abrDate;
});

console.log(`anrDate`, anrDate);
console.log(`abrDate`, abrDate);

const dauerTage = () => Math.ceil((abrDate.getTime() - anrDate.getTime())/(1000*3600*24)); // difference abreise-anreise convert from ms to days
dauer.textContent = dauerTage();

