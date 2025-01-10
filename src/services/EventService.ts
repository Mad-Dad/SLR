import axios from 'axios';
import type { Event } from '@/types/Event.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/events/event';

export const EventService = {
  async getAll(): Promise<Event[]> {
    console.log ("HERE1")
    console.log("Fetching events from", API_URL);
    try {
      const response = await axios.get<Event[]>(API_URL);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Event data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return []; // Return an empty array, not undefined
    }
  },


  async get(id: number): Promise<Event | null> {
    try {
      const response = await axios.get<Event>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      return null;
    }
  },

  async create(event: Omit<Event, 'id'>): Promise<Event | null> {
    try {

      const response = await axios.post<Event>(API_URL, event);
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      return null;
    }
  },

  async update(event: Event): Promise<Event | null> {
    try {
      console.log(API_URL);
      const response = await axios.put<Event>(`${API_URL}/${event.id}`, event);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with ID ${event.id}:`, error);
      return null;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      return false;
    }
  },
};