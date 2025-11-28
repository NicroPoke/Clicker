<template>
  <div class="hotbar">
    <button @click="$emit('open-shop')">Shop</button>
  </div>
</template>
<style scoped>
.hotbar {
  display: flex;
  gap: 15px;
  padding: 15px;
  background-color: #1e1f23;
  justify-content: right;
  box-shadow: 0 2px 10px #00000060;
}
button {
  font-family: "Schoolbell", cursive;
  height: 45px;
  width: 150px;
  background-color: #424549;
  color: #e492e8;
  border: none;
  border-radius: 12px;
  text-align: center;
  line-height: 45px;
  font-size: 18px;
  text-decoration: none;
  transition: 0.25s ease;
  box-shadow: 0 3px 6px #00000060;
}
button:hover {
  background-color: #51555a;
  transform: scale(1.1);
}
</style>

<script>
export default {
  name: "Hotbar",
};
</script>
