<template>
  <div class="wrapper">
    <Hotbar 
      @open-main="showShop = false"
      @open-shop="showShop = !showShop"
    />

    <h1>Slime Clicker</h1>
    <h3>{{ plorts }}</h3>

    <button @click="addPlorts" class="clicker"></button>
    <ShopMini 
      :visible="showShop"
      @upgrade="upgradeClickPower"
      @autoclick="buyAutoClicker"
      @close="showShop = false"
    />
    <GameModal
      v-model:visible="modalVisible"
      :message="modalMessage"
      @yes="modalYes"
    />
    <FlyingSlime
      v-for="slime in slimes"
      :key="slime.id"
      :x="slime.x"
      :y="slime.y"
    />
  </div>
</template>

<script>
import Hotbar from "./components/Hotbar.vue";
import ShopMini from "./components/ShopMini.vue";
import GameModal from "./components/Modal.vue";
import FlyingSlime from "./components/FlyingSlime.vue";

export default {
  components: {
    Hotbar,
    ShopMini,
    GameModal,
    FlyingSlime
  },

  data() {
    return {
      plorts: parseInt(localStorage.getItem("plorts")) || 0,
      clickPower: parseInt(localStorage.getItem("clickPower")) || 1,
      upgradeCost: parseFloat(localStorage.getItem("upgradeCost")) || 10,

      autoClickCost: parseInt(localStorage.getItem("autoClickCost")) || 50,
      autoClickLevel: parseInt(localStorage.getItem("autoClickLevel")) || 0,

      autoClickInterval: null,

      modalVisible: false,
      modalMessage: "",
      modalCallback: null,

      showShop: false,

      slimes: []
    };
  },

  mounted() {
    this.startAutoClicker();
  },

  methods: {
    addPlorts(event) {
      this.plorts += this.clickPower;
      this.spawnSlime(event.clientX, event.clientY);
    },
    upgradeClickPower() {
      if (this.plorts < this.upgradeCost) {
        return this.openModal(
          `Not enough Plorts! You need ${Math.ceil(this.upgradeCost)}, but you have ${this.plorts}.`
        );
      }

      this.clickPower++;
      this.plorts -= Math.ceil(this.upgradeCost);
      this.upgradeCost *= 1.5;
      this.openModal(`Upgrade successful! Click Power: ${this.clickPower}`);
    },
    buyAutoClicker() {
      if (this.plorts < this.autoClickCost) {
        return this.openModal(
          `Not enough Plorts! You need ${Math.ceil(this.autoClickCost)}, but you have ${this.plorts}.`
        );
      }

      this.plorts -= this.autoClickCost;
      this.autoClickLevel++;
      this.autoClickCost = Math.floor(this.autoClickCost * 1.5);
      this.openModal(`Auto Clicker purchased! Level: ${this.autoClickLevel}`);

      if (this.autoClickInterval) clearInterval(this.autoClickInterval);
      this.startAutoClicker();
    },
    startAutoClicker() {
      this.autoClickInterval = setInterval(() => {
        this.plorts += this.autoClickLevel;
      }, 1000);
    },
    openModal(message, callback = null) {
      this.modalMessage = message;
      this.modalCallback = callback;
      this.modalVisible = true;
    },
    modalYes() {
      if (this.modalCallback) this.modalCallback();
      this.modalVisible = false;
    },
    spawnSlime(x, y) {
      const id = Date.now() + Math.random();
      this.slimes.push({ id, x, y });
      setTimeout(() => {
        this.slimes = this.slimes.filter(s => s.id !== id);
      }, 1400);
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #2a2b30;
  min-height: 100vh;
}

h1 {
  font-family: "Schoolbell", cursive;
  color: #e492e8;
  font-weight: bold;
  font-size: 64px;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 15px #663881;
}

h3 {
  color: #d6b8ff;
  font-weight: lighter;
  text-align: center;
  font-size: 32px;
  margin: 10px 0 20px 0;
  text-shadow: 0 0 10px #b384e6;
}

.clicker {
  display: block;
  margin: 0 auto;
  height: 260px;
  width: 260px;
  background: transparent;
  background-image: url('@/assets/img.png');
  background-size: cover;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.2s ease;
  border: none;
  filter: drop-shadow(0 0 15px #663881);
}

.clicker:active {
  transform: scale(1.1);
  filter: drop-shadow(0 0 25px #663881);
}
</style>
