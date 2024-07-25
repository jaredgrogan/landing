<template>
  <nav class="navbar">
    <div class="logo">DataViz</div>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(90deg, #2193b0, #6dd5ed);
  color: #fff;
}
.navbar .logo {
  font-size: 1.5rem;
  font-weight: bold;
}
.navbar ul {
  list-style: none;
  display: flex;
}
.navbar ul li {
  margin-left: 1rem;
}
.navbar ul li a {
  text-decoration: none;
  color: #fff;
}
</style>
