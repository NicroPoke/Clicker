<template>
  <transition name="slime">
    <div
      v-if="visible"
      class="slime"
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
  props: ["x", "y"],
  data() {
    return {
      visible: true,
      moveX: 0,
      moveY: 0,
      scale: Math.random() * 0.5 + 0.5
    };
  },
  mounted() {
    requestAnimationFrame(() => {
      this.moveX = (Math.random() - 0.5) * 60;
      this.moveY = - (Math.random() * 200); 
    });

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
  transition: transform 1.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.3s ease-out;
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
</style>
