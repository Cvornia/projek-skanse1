<template>
    <div id="app">
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import Navbar from './components/Navbar.vue'
  
  export default {
    components: {
      Navbar
    }
  }
  </script>

<style>
/* Opsional: styling global */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>