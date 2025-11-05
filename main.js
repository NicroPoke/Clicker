let counter = document.getElementById("count");
let clicker = document.getElementById("click");
let reset = document.getElementById("reset");
let amount = parseInt(localStorage.getItem("coins")) || 0;
counter.textContent = amount;

function Add() {
    amount += 1;
    counter.textContent = amount;
    localStorage.setItem("coins", amount);

    clicker.classList.add("active");
    setTimeout(() => clicker.classList.remove("active"), 100);
}
function ResetAll() {
    amount = 0;
    counter.textContent = amount;
    localStorage.setItem("coins", amount);
}

clicker.addEventListener("click", Add);
reset.addEventListener("click", ResetAll);
