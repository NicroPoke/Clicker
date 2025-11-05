let counter = document.getElementById("count");
let clicker = document.getElementById("click");
let amount = 0; 

function Add() {
    amount += 1;
    counter.textContent = amount; 
    clicker.classList.add("active");

    setTimeout(() => {
        clicker.classList.remove("active");
    }, 100);
    }

clicker.addEventListener("click", Add);
