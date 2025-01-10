import axios from 'axios';
import type { User } from '@/types/User.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/users';
console.log ('URL = ', API_URL)
export const UserService = {
  async getAll(): Promise<User[]> {

    try {
      const response = await axios.get<User[]>(API_URL);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("User Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Users:", error);
      return []; // Return an empty array, not undefined
    }
  },


  async get(id: number): Promise<User | null> {
    try {
      const response = await axios.get<User>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching User with ID ${id}:`, error);
      return null;
    }
  },

  async create(user: Omit<User, 'id'>): Promise<User | null> {
    try {

      const response = await axios.post<User>(API_URL, user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },

  async update(user: User): Promise<User | null> {
    try {
      console.log(API_URL);
      const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${user.id}:`, error);
      return null;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      return false;
    }
  },
};