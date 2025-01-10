import { defineStore } from 'pinia';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASE_URL + '/users';
console.log("URL = ", API_URL)
interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false, 
    user: null as User | null,
    token: null as string | null,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post(API_URL+'/login', { username, password });
        console.log(response.status);
        if (response.status === 200){
          this.isLoggedIn = true;
          this.user = response.data.user;
          this.token = response.data.token;
        }
      } catch (error) {
        throw new Error('Login failed.');
      }
    },
    async register(firstname: string,lastname: string, email: string, username: string, password: string) {
      try {
        console.log("registering user start")
        const response = await axios.post(API_URL+'/register', { firstname, lastname, email, username, password });
        console.log("registered")
        this.user = response.data.user;
        this.token = response.data.token;
        // Store token in local storage or cookies
      } catch (error) {
        throw new Error('Registration failed.');
      }
    },
    // Add logout action to clear user and token
  },
});