<template>
  <transition name="slime">
    <div
      v-if="visible"
      :class="['slime', { critical: critical }]"
      :style="{
        left: x + 'px',
        top: y + 'px',
        transform: `translate(${moveX}px, ${moveY}px) scale(${scale})`
      }"
    ></div>
  </transition>
</template>

<script>
export default {
  name: "FlyingSlime",
  props: ["x", "y", "critical"],
  data() {
    return {
      visible: true,
      moveX: 0,
      moveY: 0,
      scale: Math.random() * 0.5 + 0.5
    };
  },
  mounted() {
    if (this.critical) {
      this.scale *= 1.35;
      this.moveX = (Math.random() - 0.5) * 80;
      this.moveY = - (Math.random() * 280);
    } else {
      requestAnimationFrame(() => {
        this.moveX = (Math.random() - 0.5) * 60;
        this.moveY = - (Math.random() * 200);
      });
    }

    setTimeout(() => (this.visible = false), 500);
  }
};
</script>

<style scoped>
.slime {
  position: fixed;
  width: 60px;
  height: 60px;
  background-image: url("@/assets/img.png");
  background-size: cover;
  pointer-events: none;
  opacity: 1;
  transition: transform 1.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.3s ease-out, filter 0.25s ease;
}
.slime-enter-from {
  opacity: 0;
  transform: scale(0.5) translate(0, 0);
}
.slime-enter-to {
  opacity: 1;
}
.slime-leave-active {
  transition: opacity 0.5s;
}
.slime-leave-to {
  opacity: 0;
}

.slime.critical {
  filter: drop-shadow(0 0 18px #ffd86b) saturate(1.25) brightness(1.05);
  transform-origin: center;
  animation: criticalGlow 0.9s ease-out;
}

@keyframes criticalGlow {
  0% { transform: scale(0.9); }
  40% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
</style>
