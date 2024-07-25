<template>
  <div class="home">
    <Navbar />
    <div class="content">
      <ChartComponent />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import ChartComponent from '@/components/ChartComponent.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    ChartComponent
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
