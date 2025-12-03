<template>
  <div class="wrapper">
    <Hotbar 
      @open-main="showShop = false"
      @open-shop="showShop = !showShop"
      @open-reset="resetModalVisible = true"
    />

    <Clicker
      :plorts="plorts"
      :clickPower="clickPower"
      @add-plorts="addPlorts"
    />

    <AscendBar
      :current-progress="plorts"
      :can-ascend="plorts >= 100000"
      :ascends="ascendCount"
      @ascend="performAscend"
    />

    <ShopMini 
      :visible="showShop"
      :multiplier-cost="multiplierCost"
      :multiplier-level="multiplierLevel"
      :critical-cost="criticalCost"
      :critical-level="criticalLevel"
      :upgrade-cost="upgradeCost"
      :click-power="clickPower"
      :auto-click-cost="autoClickCost"
      :auto-click-level="autoClickLevel"
      @upgrade="upgradeClickPower"
      @autoclick="buyAutoClicker"
      @buy-multiplier="buyMultiplier"
      @buy-critical="buyCritical"
      @close="showShop = false"
    />
    <GameModal
      v-model:visible="modalVisible"
      :message="modalMessage"
      @yes="modalYes"
    />
    <GameModal
      :visible="resetModalVisible"
      :message="'Are you sure? This will reset all your progress!'"
      :show-no="true"
      yes-text="Reset"
      no-text="Cancel"
      @yes="confirmReset"
      @no="closeResetModal"
    />
    <FlyingSlime
      v-for="slime in slimes"
      :key="slime.id"
      :x="slime.x"
      :y="slime.y"
      :critical="slime.critical"
    />
  </div>
</template>

<script>
import Hotbar from "./components/Hotbar.vue";
import Clicker from "./components/Clicker.vue";
import ShopMini from "./components/ShopMini.vue";
import GameModal from "./components/Modal.vue";
import FlyingSlime from "./components/FlyingSlime.vue";
import AscendBar from "./components/AscendBar.vue";

export default {
  components: {
    Hotbar,
    Clicker,
    ShopMini,
    GameModal,
    FlyingSlime,
    AscendBar
  },

  data() {
    return {
      plorts: parseInt(localStorage.getItem("plorts")) || 0,
      clickPower: parseInt(localStorage.getItem("clickPower")) || 1,
      upgradeCost: parseFloat(localStorage.getItem("upgradeCost")) || 10,

      autoClickCost: parseInt(localStorage.getItem("autoClickCost")) || 50,
      autoClickLevel: parseInt(localStorage.getItem("autoClickLevel")) || 0,

      multiplierLevel: parseInt(localStorage.getItem("multiplierLevel")) || 0,
      multiplierCost: parseInt(localStorage.getItem("multiplierCost")) || 100,
      multiplierDuration: parseInt(localStorage.getItem("multiplierDuration")) || 30,
      multiplierActiveUntil: parseInt(localStorage.getItem("multiplierActiveUntil")) || 0,

      criticalLevel: parseInt(localStorage.getItem("criticalLevel")) || 0,
      criticalCost: parseInt(localStorage.getItem("criticalCost")) || 75,
      criticalChance: parseFloat(localStorage.getItem("criticalChance")) || 0,

      ascendCount: parseInt(localStorage.getItem("ascendCount")) || 0,

      autoClickInterval: null,

      modalVisible: false,
      modalMessage: "",
      modalCallback: null,

      resetModalVisible: false,

      showShop: false,

      slimes: []
    };
  },

  mounted() {
    this.startAutoClicker();
  },

    beforeUnmount() {
      if (this.autoClickInterval) clearInterval(this.autoClickInterval);
    },  watch: {
    plorts(newVal) {
      localStorage.setItem('plorts', newVal);
    },
    clickPower(newVal) {
      localStorage.setItem('clickPower', newVal);
    },
    upgradeCost(newVal) {
      localStorage.setItem('upgradeCost', newVal);
    },
    autoClickCost(newVal) {
      localStorage.setItem('autoClickCost', newVal);
    },
    autoClickLevel(newVal) {
      localStorage.setItem('autoClickLevel', newVal);
    },
    multiplierLevel(newVal) {
      localStorage.setItem('multiplierLevel', newVal);
    },
    multiplierCost(newVal) {
      localStorage.setItem('multiplierCost', newVal);
    },
    multiplierActiveUntil(newVal) {
      localStorage.setItem('multiplierActiveUntil', newVal);
    },
    multiplierDuration(newVal) {
      localStorage.setItem('multiplierDuration', newVal);
    },
    criticalLevel(newVal) {
      localStorage.setItem('criticalLevel', newVal);
    },
    criticalCost(newVal) {
      localStorage.setItem('criticalCost', newVal);
    },
    criticalChance(newVal) {
      localStorage.setItem('criticalChance', newVal);
    },
    ascendCount(newVal) {
      localStorage.setItem('ascendCount', newVal);
    }
  },

  methods: {
    addPlorts(event) {
      const now = Date.now();
      const multiplierActive = this.multiplierActiveUntil && now < this.multiplierActiveUntil;
      const multiplierValue = 1 + 0.5 * this.multiplierLevel;
      let effectiveClick = this.clickPower * (multiplierActive ? multiplierValue : 1);

      const ascendBonus = this.ascendCount > 0 ? 2 : 1;
      effectiveClick *= ascendBonus;

      const chance = Math.min(this.criticalChance, 90);
      const roll = Math.random() * 100;
      let criticalHit = false;
      if (roll < chance) {
        criticalHit = true;
        effectiveClick *= 2;
      }

      this.plorts += Math.ceil(effectiveClick);

      const x = event?.clientX || event?.touches?.[0]?.clientX || window.innerWidth / 2;
      const y = event?.clientY || event?.touches?.[0]?.clientY || window.innerHeight / 2;
      this.spawnSlime(x, y, criticalHit);
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
    buyMultiplier() {
      if (this.plorts < this.multiplierCost) {
        return this.openModal(`Not enough Plorts! Need ${this.multiplierCost}`, null);
      }
      this.plorts -= this.multiplierCost;
      this.multiplierLevel++;
      const now = Date.now();
      const extraMs = this.multiplierDuration * 1000;
      this.multiplierActiveUntil = Math.max(this.multiplierActiveUntil || 0, now) + extraMs;
      this.multiplierCost = Math.floor(this.multiplierCost * 2);
      this.openModal(`Purchased multiplier level ${this.multiplierLevel}!`);
    },
    buyCritical() {
      if (this.plorts < this.criticalCost) {
        return this.openModal(`Not enough Plorts! Need ${this.criticalCost}`, null);
      }
      this.plorts -= this.criticalCost;
      this.criticalLevel++;
      this.criticalChance = Math.min(90, this.criticalChance + 5);
      this.criticalCost = Math.floor(this.criticalCost * 1.7);
      this.openModal(`Critical chance increased to ${this.criticalChance}%`);
    },
    startAutoClicker() {
      this.autoClickInterval = setInterval(() => this.plorts += this.autoClickLevel, 1000);
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
    spawnSlime(x, y, critical = false) {
      const id = Date.now() + Math.random();
      this.slimes.push({ id, x, y, critical });
      setTimeout(() => this.slimes = this.slimes.filter(s => s.id !== id), 1400);
    },
    closeResetModal() {
      this.resetModalVisible = false;
    },
    confirmReset() {
      localStorage.clear();
      location.reload();
    },
    performAscend() {
      this.ascendCount++;
      localStorage.clear();
      localStorage.setItem('ascendCount', this.ascendCount);
      location.reload();
    }
  }
};
</script>

<style scoped>
.wrapper {
  background: linear-gradient(135deg, #1a1b20 0%, #2a2b30 50%, #1f2025 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.wrapper::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(228, 146, 232, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 90, 154, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}
</style>
