<template>
  <div class="ascend-container">
    <div class="ascend-info">
      <span>Ascend Progress</span>
      <span class="ascend-count" v-if="ascends > 0">+{{ ascends }}x Bonus</span>
    </div>
    <div class="ascend-bar-wrapper">
      <div class="ascend-bar-background">
        <div class="ascend-bar-fill" :style="{ width: fillPercentage + '%' }"></div>
      </div>
    </div>
    <button 
      v-if="canAscend" 
      class="ascend-btn" 
      @click="$emit('ascend')"
    >
      Ascend
    </button>
    <div v-else class="ascend-locked">
      Unlock at 100,000 Plorts
    </div>
  </div>
</template>

<script>
export default {
  name: "AscendBar",
  props: {
    currentProgress: {
      type: Number,
      required: true
    },
    canAscend: {
      type: Boolean,
      required: true
    },
    ascends: {
      type: Number,
      default: 0
    }
  },
  computed: {
    fillPercentage() {
      return Math.min(100, (this.currentProgress / 100000) * 100);
    }
  },
  emits: ['ascend']
};
</script>

<style scoped>
.ascend-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #2a2b30 0%, #323539 100%);
  border: 2px solid #ffd700;
  border-radius: 16px;
  margin-top: 20px;
  box-shadow: 
    0 0 30px rgba(255, 215, 0, 0.2),
    0 8px 25px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.ascend-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffd700;
  font-weight: 600;
  font-size: 14px;
  font-family: "Fredoka", sans-serif;
}

.ascend-count {
  color: #ffed4e;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
  font-weight: 700;
}

.ascend-bar-wrapper {
  position: relative;
}

.ascend-bar-background {
  width: 100%;
  height: 28px;
  background: linear-gradient(135deg, #1a1b20 0%, #2a2b30 100%);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6);
}

.ascend-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
  border-right: 2px solid #ffed4e;
  box-shadow: 
    0 0 15px rgba(255, 215, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: width 0.3s ease;
}

.ascend-progress-text {
  display: none;
}

.ascend-btn {
  font-family: "Fredoka", sans-serif;
  height: 48px;
  width: 100%;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a1b20;
  font-weight: 700;
  font-size: 16px;
  border: 2px solid #ffb300;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 
    0 4px 15px rgba(255, 215, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ascend-btn:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 8px 25px rgba(255, 215, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  background: linear-gradient(135deg, #ffed4e 0%, #ffff66 100%);
}

.ascend-btn:active {
  transform: translateY(-1px);
  box-shadow: 
    0 4px 12px rgba(255, 215, 0, 0.4),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.ascend-locked {
  text-align: center;
  color: #999;
  font-size: 12px;
  font-weight: 600;
  font-family: "Fredoka", sans-serif;
  padding: 8px;
}
</style>
