<template>
  <transition name="fade-shop">
    <div class="shop-window" v-if="visible">
      <h2 class="title">Shop</h2>



          <div class="shop-item">
            <img src="@/assets/img.png" alt="Plort Upgrade">
            <div style="flex:1">
              <div class="item-title">Plort Upgrade</div>
              <div class="item-sub">Increase click power permanently (+1 per purchase)</div>
            </div>
            <div class="item-meta">
              <div class="price">Price: {{ formatPrice(upgradeCost) }}</div>
              <div class="owned">Owned: {{ clickPower }}</div>
              <button class="shop-btn large" @click="upgradeClick">Buy</button>
            </div>
          </div>

          <div class="shop-item">
            <img src="@/assets/dervishslime.png" alt="Auto Clicker">
            <div style="flex:1">
              <div class="item-title">Auto Clicker</div>
              <div class="item-sub">Adds passive Plorts per second (each level adds +1/sec)</div>
            </div>
            <div class="item-meta">
              <div class="price">Price: {{ formatPrice(autoClickCost) }}</div>
              <div class="owned">Owned: {{ autoClickLevel }}</div>
              <button class="shop-btn large" @click="buyAutoClicker">Buy</button>
            </div>
          </div>
           <div class="shop-item">
          <img src="@/assets/Pear.png" alt="Multiplier">
          <div style="flex:1">
            <div class="item-title">Multiplier</div>
            <div class="item-sub">Temporary click multiplier (adds +50% per level)</div>
          </div>
          <div class="item-meta">
            <div class="price">Price: {{ formatPrice(multiplierCost) }}</div>
            <div class="owned">Owned: {{ multiplierLevel }}</div>
            <button class="shop-btn large" @click="buyMultiplier">Buy</button>
          </div>
        </div>

        <div class="shop-item">
          <img src="@/assets/goldplort.png" alt="Critical">
          <div style="flex:1">
            <div class="item-title">Critical Chance</div>
            <div class="item-sub">Increase chance of critical clicks (+5% per level)</div>
          </div>
          <div class="item-meta">
            <div class="price">Price: {{ formatPrice(criticalCost) }}</div>
            <div class="owned">Owned: {{ criticalLevel }}</div>
            <button class="shop-btn large" @click="buyCritical">Buy</button>
          </div>
        </div>

      <button class="close-btn" @click="$emit('close')">Close</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ShopMini",
  props: [
    "visible",
    "multiplierCost",
    "multiplierLevel",
    "criticalCost",
    "criticalLevel",
    "upgradeCost",
    "clickPower",
    "autoClickCost",
    "autoClickLevel"
  ],
  methods: {
    upgradeClick() {
      this.$emit("upgrade");
    },
    buyAutoClicker() {
      this.$emit("autoclick");
    },
    buyMultiplier() {
      this.$emit('buy-multiplier');
    },
    buyCritical() {
      this.$emit('buy-critical');
    },
    formatPrice(n) {
      if (n === null || n === undefined || isNaN(n)) return 0;
      return Math.round(n);
    }
  }
};
</script>

<style scoped>
.shop-window {
  position: fixed;
  top: 120px;
  right: 20px;
  width: 340px;
  max-height: calc(100vh - 160px);
  padding: 14px;
  background: linear-gradient(135deg, #2a2b30 0%, #323539 100%);
  border: 2px solid #e492e8;
  border-radius: 24px;
  box-shadow: 
    0 0 40px rgba(228, 146, 232, 0.3),
    0 15px 35px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  z-index: 1200;
  backdrop-filter: blur(10px);
  overflow: visible;
  box-sizing: border-box;
}

.title {
  font-family: "Fredoka", sans-serif;
  text-align: center;
  color: #e492e8;
  font-size: 22px;
  margin: 0 0 12px 0;
  text-shadow: 0 0 15px rgba(228, 146, 232, 0.5);
  letter-spacing: 1px;
}

.shop-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  background: linear-gradient(135deg, #3a3c42 0%, #434852 100%);
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(228, 146, 232, 0.12);
  box-shadow: 
    0 3px 10px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.shop-item:hover {
  transform: translateY(-6px);
  background: linear-gradient(135deg, #454a51 0%, #4e545f 100%);
  box-shadow: 
    0 12px 25px rgba(228, 146, 232, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-color: rgba(228, 146, 232, 0.4);
}

.shop-item img {
  width: 44px;
  height: 44px;
  filter: drop-shadow(0 0 8px rgba(228, 146, 232, 0.35));
  transition: transform 0.22s ease;
}

.item-title {
  color: #ffe6ff;
  font-weight: 600;
  margin-bottom: 2px;
  font-size: 14px;
}
.item-sub {
  color: #d1c0e8;
  font-size: 12px;
  margin-bottom: 6px;
}
.item-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}
.price, .owned {
  color: #ffd9ff;
  font-size: 13px;
}

.shop-item:hover img {
  transform: scale(1.1) rotate(5deg);
}

.shop-btn {
  font-family: "Fredoka", sans-serif;
  flex: 0 0 auto;
  height: 42px;
  min-width: 90px;
  background: linear-gradient(135deg, #2e3035 0%, #39404a 100%);
  color: #ff9fff;
  font-weight: 700;
  font-size: 14px;
  border: 1px solid rgba(255, 159, 255, 0.25);
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.shop-btn.large {
  height: 46px;
  min-width: 100px;
  padding: 0 10px;
  font-size: 15px;
}

.shop-btn:hover {
  background: linear-gradient(135deg, #ffb3ff 0%, #ffd6ff 100%);
  color: #2a2b30;
  transform: scale(1.04);
  box-shadow: 0 5px 14px rgba(255, 159, 255, 0.32);
  border-color: rgba(255, 159, 255, 0.7);
}

.shop-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.close-btn {
  font-family: "Fredoka", sans-serif;
  display: block;
  margin: 14px auto 0 auto;
  height: 44px;
  width: 140px;
  background: linear-gradient(135deg, #424549 0%, #505559 100%);
  color: #e492e8;
  border: 1px solid rgba(228, 146, 232, 0.24);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.close-btn:hover {
  background: linear-gradient(135deg, #51555a 0%, #5f636a 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(228, 146, 232, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(228, 146, 232, 0.6);
}

.close-btn:active {
  transform: translateY(-1px);
}

.fade-shop-enter-active,
.fade-shop-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-shop-enter-from {
  opacity: 0;
  transform: scale(0.7) rotateY(-20deg);
}

.fade-shop-enter-to {
  opacity: 1;
  transform: scale(1) rotateY(0);
}

.fade-shop-leave-from {
  opacity: 1;
  transform: scale(1) rotateY(0);
}

.fade-shop-leave-to {
  opacity: 0;
  transform: scale(0.7) rotateY(20deg);
}
</style>

