<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-window">
      <p class="modal-text">{{ message }}</p>

      <div class="buttons">
        <button @click="$emit('yes')" class="yes">{{ yesText }}</button>
        <button v-if="showNo" @click="$emit('no')" class="no">{{ noText }}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameModal",
  props: {
    visible: Boolean,
    message: String,
    showNo: {
      type: Boolean,
      default: false
    },
    yesText: {
      type: String,
      default: 'Ok'
    },
    noText: {
      type: String,
      default: 'Cancel'
    }
  },
  emits: ['yes', 'no']
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}

.modal-window {
  background: linear-gradient(135deg, #2a2b30 0%, #333a40 100%);
  padding: 30px;
  border-radius: 20px;
  width: 340px;
  text-align: center;
  border: 2px solid #e492e8;
  z-index: 10000;
  box-shadow: 
    0 0 50px rgba(228, 146, 232, 0.4),
    0 20px 60px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-text {
  font-family: "Fredoka", sans-serif;
  color: #e492e8;
  font-size: 20px;
  margin: 0 0 25px 0;
  line-height: 1.5;
  text-shadow: 0 0 10px rgba(228, 146, 232, 0.3);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.yes,
.no {
  font-family: "Fredoka", sans-serif;
  padding: 8px 15px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: bold;
  font-size: 16px;
  min-width: 120px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.yes {
  background: linear-gradient(135deg, #e492e8 0%, #ff9fff 100%);
  color: #2a2b30;
}

.yes:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(228, 146, 232, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.yes:active {
  transform: translateY(-1px);
}

.no {
  background: linear-gradient(135deg, #666 0%, #888 100%);
  color: #e492e8;
  border: 1px solid rgba(228, 146, 232, 0.3);
}

.no:hover {
  background: linear-gradient(135deg, #777 0%, #999 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(228, 146, 232, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-color: rgba(228, 146, 232, 0.6);
}

.no:active {
  transform: translateY(-1px);
}
</style>
