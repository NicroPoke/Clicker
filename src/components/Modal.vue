<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-window">
      <p class="modal-text">{{ message }}</p>

      <div class="buttons">
        <button @click="$emit('yes')" class="yes">Ok</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameModal",
  props: {
    visible: Boolean,
    message: String
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: #0008;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-window {
  background: #2a2b30;
  padding: 20px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  border: 2px solid #e492e8;
}
.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.yes {
  font-family: "Schoolbell", cursive;
  background: #e492e8;
  padding: 8px 15px;
  border-radius: 10px;
}
.modal-text {
  font-family: "Schoolbell", cursive;
  color: #e492e8;
  font-size: 18px;
} 
</style>
