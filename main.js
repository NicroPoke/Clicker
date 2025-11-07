document.addEventListener("DOMContentLoaded", () => {
    const count = document.getElementById("count");
    const clicker = document.getElementById("click");
    const reset = document.getElementById("reset");
    const upgrade1 = document.getElementById("upgradebutton");
    const autoClickButton = document.getElementById("autoclick");

    let amount = parseInt(localStorage.getItem("count")) || 0;
    let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
    let upgradeCost = parseFloat(localStorage.getItem("upgradeCost")) || 10;
    let autoClickInterval = null;
    let autoClickCost = parseInt(localStorage.getItem("autoClickCost")) || 50;
    let autoclickLevel = parseInt(localStorage.getItem("autoclickLevel")) || 0;

    count.textContent = amount;
    function upgrade(){
        if (amount < upgradeCost) {
            alert(`Not enough coins! You need: ${Math.ceil(upgradeCost)}, you have: ${amount}`);
            return;
        }
        clickPower += 1;
        amount -= Math.ceil(upgradeCost);
        upgradeCost *= 1.5;
        alert(`Upgrade successful! New click power: ${clickPower}`);
        localStorage.setItem("count", amount);
        localStorage.setItem("clickPower", clickPower);
        localStorage.setItem("upgradeCost", upgradeCost);
        count.textContent = amount;
        
    }
    function buyAutoClicker() {
        if (amount < autoClickCost) {
            alert(`Not enough coins! You need: ${autoClickCost}, you have: ${amount}`);
            return;
        }
        else {
            amount -= autoClickCost;
            autoclickLevel += 1;
            localStorage.setItem("autoclickLevel", autoclickLevel);
            localStorage.setItem("count", amount);
            count.textContent = amount;
            autoClickCost = Math.floor(autoClickCost * 2);
            localStorage.setItem("autoClickCost", autoClickCost);
            alert(`Derwish Slime purchased! Level: ${autoclickLevel}`);
            if (autoClickInterval) clearInterval(autoClickInterval);
            startAutoClicker();
        }
    }
    function startAutoClicker() {
        autoClickInterval = setInterval(() => {
            amount += autoclickLevel;
            count.textContent = amount;
            localStorage.setItem("count", amount);
        }, 1000);
    }
    function Add(event) {
        amount += clickPower;
        count.textContent = amount;
        localStorage.setItem("count", amount);
        if (clicker) {
            clicker.classList.add("active");
            setTimeout(() => clicker.classList.remove("active"), 100);
        }
        createFlyingSlime(event.clientX, event.clientY);
    }

    function ResetAll() {
        amount = 0;
        clickPower = 1;
        upgradeCost = 10;
        count.textContent = amount;
        localStorage.setItem("count", amount);
        localStorage.setItem("clickPower", clickPower);
        localStorage.setItem("upgradeCost", upgradeCost);
        localStorage.setItem("autoclickLevel", 0);
        localStorage.setItem("autoClickCost", 50);
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

    if (clicker) clicker.addEventListener("click", Add);
    if (reset) reset.addEventListener("click", ResetAll);
    if (upgrade1) upgrade1.addEventListener("click", upgrade);
    if (autoClickButton) autoClickButton.addEventListener("click", buyAutoClicker);
    startAutoClicker();
})