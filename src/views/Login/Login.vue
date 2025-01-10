<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">{{ formTitle }}</div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="firstname" class="form-label">First Name</label>
                <input type="text" class="form-control" id="name" v-model="form.firstname" :disabled="isLoginForm">
              </div>              
              <div class="mb-3">
                <label for="lastname" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="name" v-model="form.lastname" :disabled="isLoginForm">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="form.email" :disabled="isLoginForm">
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">User Name</label>
                <input type="text" class="form-control" id="name" v-model="form.username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="form.password">
              </div>
              <button type="submit" class="btn btn-primary">{{ buttonText }}</button>
              <p v-if="isLoginForm">
                Don't have an account? <a href="#" @click="isLoginForm = false">Register</a> 
              </p>
              <p v-else>
                Already have an account? <a href="#" @click="isLoginForm = true">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, createApp, ref } from 'vue';
import { useUserStore } from '../../stores/users'; 


const form = ref({
  id: 0,
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  email: '',
});
const isLoginForm = ref(true); // Initially show login form

const formTitle = computed(() => (isLoginForm.value ? 'Login' : 'Register'));
const buttonText = computed(() => (isLoginForm.value ? 'Login' : 'Register'));

async function handleSubmit() {
  const userStore = useUserStore();

  try {
    if (isLoginForm.value) {
      await userStore.login(form.value.username, form.value.password);
    } else {
      await userStore.register(form.value.firstname,form.value.lastname, form.value.email, form.value.username, form.value.password);
    }
    // Handle successful login/registration (e.g., redirect)
  } catch (error) {
    // Handle errors (e.g., display error messages)
    console.error(error);
  }
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>