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
  gap: 40px;
  padding: 40px 20px;
}

h1 {
  font-family: "Fredoka", sans-serif;
  color: #e492e8;
  font-weight: bold;
  font-size: 72px;
  text-align: center;
  margin: 0;
  text-shadow: 
    0 0 20px #663881,
    0 0 40px #8b5a9a,
    0 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

h3 {
  color: #d6b8ff;
  font-weight: lighter;
  text-align: center;
  font-size: 48px;
  margin: 0;
  text-shadow: 
    0 0 15px #b384e6,
    0 0 30px #8b5a9a,
    0 2px 8px rgba(0, 0, 0, 0.5);
  font-family: "Schoolbell", cursive;
  letter-spacing: 1px;
}

.clicker {
  display: block;
  height: 280px;
  width: 280px;
  background: transparent;
  background-image: url('@/assets/img.png');
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  filter: drop-shadow(0 0 20px #663881) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.clicker:hover {
  transform: translateY(-8px) scale(1.05);
  filter: drop-shadow(0 0 30px #8b5a9a) drop-shadow(0 12px 30px rgba(0, 0, 0, 0.7));
}

.clicker:active {
  transform: scale(0.95) translateY(-2px);
  filter: drop-shadow(0 0 40px #e492e8) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.5));
}
</style>
