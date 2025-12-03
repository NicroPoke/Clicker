<template>
  <div class="hotbar">
    <button @click="$emit('open-shop')">Shop</button>
    <button @click="$emit('open-reset')" class="reset-btn">Reset</button>
  </div>
</template>
<style scoped>
.hotbar {
  display: flex;
  gap: 15px;
  padding: 15px 25px;
  background: linear-gradient(135deg, #1e1f23 0%, #2a2b30 100%);
  justify-content: flex-end;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(228, 146, 232, 0.2);
}

button {
  font-family: "Fredoka", sans-serif;
  height: 50px;
  width: 160px;
  background: linear-gradient(135deg, #424549 0%, #505559 100%);
  color: #e492e8;
  border: 1px solid rgba(228, 146, 232, 0.3);
  border-radius: 14px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

button:hover {
  background: linear-gradient(135deg, #51555a 0%, #5f636a 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(228, 146, 232, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(228, 146, 232, 0.6);
}

button:hover:before {
  left: 100%;
}

button:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(228, 146, 232, 0.2), inset 0 1px 0 rgba(0, 0, 0, 0.2);
}

.reset-btn {
  background: linear-gradient(135deg, #6b3c3c 0%, #7d4747 100%);
  color: #ff9999;
  border-color: rgba(255, 107, 107, 0.4);
}

.reset-btn:hover {
  background: linear-gradient(135deg, #8b4c4c 0%, #a05959 100%);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 107, 107, 0.6);
  color: #ffb3b3;
}
</style>

<script>
export default {
  name: "Hotbar"
};
</script>
