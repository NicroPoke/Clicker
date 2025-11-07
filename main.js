let counter = document.getElementById("count");
let clicker = document.getElementById("click");
let reset = document.getElementById("reset");
let amount = parseInt(localStorage.getItem("coins")) || 0;
let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
let upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;

counter.textContent = amount;

function upgrade(){
    if (amount < upgradeCost) {
        alert(`Not enough coins! You need: ${Math.ceil(upgradeCost)}, you have: ${amount}`);
    } else if (amount >= upgradeCost) {
        clickPower += 1;
        amount -= Math.ceil(upgradeCost);
        upgradeCost *= 1.5;
        
        localStorage.setItem("coins", amount);
        localStorage.setItem("clickPower", clickPower);
        localStorage.setItem("upgradeCost", upgradeCost);
        
        counter.textContent = amount;
        alert(`Upgrade successful! New click power: ${clickPower}`);
    }
}

function Add(event) {
    amount += clickPower;
    counter.textContent = amount;
    localStorage.setItem("coins", amount);

    clicker.classList.add("active");
    setTimeout(() => clicker.classList.remove("active"), 100);
    createFlyingSlime(event.clientX, event.clientY);
}

function ResetAll() {
    amount = 0;
    counter.textContent = amount;
    localStorage.setItem("coins", amount);
}

function createFlyingSlime(x, y) {
    let flyingSlime = document.createElement("div");

    flyingSlime.classList.add("flying-slime");
    document.body.appendChild(flyingSlime);
    flyingSlime.style.left = x - 30 + "px";
    flyingSlime.style.top = y - 30 + "px";
    
    let randomX = (Math.random() - 0.5) * 200;
    let randomY = - (Math.random() * 150 + 100);
    let scale = Math.random() * 0.5 + 0.5;
    
    requestAnimationFrame(() => {
        flyingSlime.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scale})`;
        flyingSlime.style.opacity = "0";
    });
    setTimeout(() => flyingSlime.remove(), 1500);
}

clicker.addEventListener("click", Add);
reset.addEventListener("click", ResetAll);
