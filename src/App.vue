<template>
    <div id="app">
      <Toolbar /> 
      <router-view />
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
    import Toolbar from '@/components/Toolbar.vue';
    import Footer from '@/components/Footer.vue';
</script>
  
  <style scoped>
/* Basic styles to make the toolbar visible */
  nav {
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  </style>