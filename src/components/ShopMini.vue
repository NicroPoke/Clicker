<template>
  <transition name="fade-shop">
    <div class="shop-window" v-if="visible">
      <h2 class="title">Shop</h2>

      <div class="shop-item">
        <img src="@/assets/img.png" alt="Plort">
        <button class="shop-btn" @click="upgradeClick">Plort Upgrade</button>
      </div>

      <div class="shop-item">
        <img src="@/assets/dervishslime.png" alt="Dervish Slime">
        <button class="shop-btn" @click="buyAutoClicker">Dervish Slime</button>
      </div>

      <button class="close-btn" @click="$emit('close')">Close</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ShopMini",
  props: ["visible"],
  methods: {
    upgradeClick() {
      this.$emit("upgrade");
    },
    buyAutoClicker() {
      this.$emit("autoclick");
    }
  }
};
</script>

<style scoped>
.shop-window {
  position: absolute;
  top: 120px;
  right: 20px;
  width: 320px;
  padding: 20px;
  background: #2a2b30;
  border: 2px solid #e492e8;
  border-radius: 20px;
  box-shadow: 0 0 20px #0005;
  z-index: 99;
}

.shop-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 25px 0;
  background-color: #3a3c42;
  padding: 15px 25px;
  border-radius: 15px;
  box-shadow: 0 4px 12px #00000040;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.shop-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px #00000050;
}

.shop-item img {
  width: 50px;
  height: 50px;
}

.shop-btn {
  font-family: "Schoolbell", cursive;
  flex: 1;
  height: 50px;
  background: #2e3035;
  color: #ff9fff;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 3px 6px #00000060;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.shop-btn:hover {
  transform: scale(1.05);
}

.shop-btn:active {
  transform: scale(0.95);
}

.close-btn {
  font-family: "Schoolbell", cursive;
  display: block;
  margin: 10px auto 0 auto;
  height: 55px;
  width: 180px;
  background-color: #424549;
  color: #e492e8;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 12px #00000060;
}

.close-btn:hover {
  transform: scale(1.05);

}

.title {
  font-family: "Schoolbell", cursive;
  text-align: center;
  color: #e492e8;
  font-size: 28px;
  margin-bottom: 20px;
}
.fade-shop-enter-active, .fade-shop-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-shop-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.fade-shop-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-shop-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-shop-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>

