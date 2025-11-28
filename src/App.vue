<template>
  <div class="wrapper">
    <Hotbar 
      @open-main="showShop = false"
      @open-shop="showShop = !showShop"
    />

    <Clicker
      :plorts="plorts"
      :clickPower="clickPower"
      @add-plorts="addPlorts"
    />

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
import Clicker from "./components/Clicker.vue";
import ShopMini from "./components/ShopMini.vue";
import GameModal from "./components/Modal.vue";
import FlyingSlime from "./components/FlyingSlime.vue";

export default {
  components: {
    Hotbar,
    Clicker,
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
</style>
