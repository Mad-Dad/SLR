<template>
  <div class="container">
    <div class="left">
    <img class="logo" src="/StateLineRodzLogo.jpg" >
    </div>
    <div class="center">
      <b>Bringing the Automotive & Motorcycle community together to help those in need!</b>
    </div>
    <div class="right">
    <b>
      <span v-if="userStore.isLoggedIn">
        Welcome, {{ userStore.user?.firstname || 'Guest' }}! 
      </span>
      <router-link v-else to="/login">Register / Login</router-link>
    </b>
  </div>
  </div>
  <nav class="toolbar">

    <div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About Us</router-link></li>
      <li><router-link to="/team">Our Team</router-link></li>
      <li><router-link to="/support">Support</router-link></li>
      <li><router-link to="/news">News</router-link></li>
      <li><router-link to="/events">Events</router-link></li>
      <li><router-link to="/membership">Membership Info</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
    </div>
    
  </nav>
</template>
<script setup lang="ts">
import { useUserStore } from '././../stores/users'; 

const userStore = useUserStore();
</script>
<style scoped>
.logo{
  height: 150px;
}
.toolbar {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
}

.toolbar ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toolbar li {
  display: inline-block;
  margin: 0 15px;
}

.toolbar a {
  color: #fff;
  text-decoration: none;
}

.container{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: 10em;
}
.container>div{
  flex:1;
}
.container>.left {
  align-self: center;
}
.container>.center {
  align-self: center;
}
.container>.right {
  align-self: center;
  text-align: right;
  padding-right: 5%;
}
</style>