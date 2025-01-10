<template>
    <form @submit.prevent="registerUser">
      <input type="text" v-model="user.username" placeholder="Username" />
      <input type="password" v-model="user.password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  import { UserService } from '../services/UserService';
  
  const user = reactive({ username: '', password: '' });
  
  const registerUser = async () => {
    try {
      await UserService.create(user);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed.');
    }
  };
  </script>