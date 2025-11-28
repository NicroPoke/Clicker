<template>
  <div class="clicker-container">
    <h1>Slime Clicker</h1>
    <h3>{{ plorts }}</h3>
    <button @click="addPlorts" class="clicker"></button>
  </div>
</template>

<script>
export default {
  name: "Clicker",
  
  props: {
    plorts: {
      type: Number,
      required: true
    },
    clickPower: {
      type: Number,
      required: true
    }
  },

  emits: ['add-plorts'],

  methods: {
    addPlorts(event) {
      this.$emit('add-plorts', event);
    }
  }
};
</script>

<style scoped>
.clicker-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

h1 {
  font-family: "Schoolbell", cursive;
  color: #e492e8;
  font-weight: bold;
  font-size: 64px;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 15px #663881;
}

h3 {
  color: #d6b8ff;
  font-weight: lighter;
  text-align: center;
  font-size: 32px;
  margin: 10px 0 20px 0;
  text-shadow: 0 0 10px #b384e6;
}

.clicker {
  display: block;
  height: 260px;
  width: 260px;
  background: transparent;
  background-image: url('@/assets/img.png');
  background-size: cover;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.2s ease;
  border: none;
  filter: drop-shadow(0 0 15px #663881);
}

.clicker:active {
  transform: scale(1.1);
  filter: drop-shadow(0 0 25px #663881);
}
</style>
