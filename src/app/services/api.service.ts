import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseURL = 'https://test.worldsacross.com/api';

  constructor() {}

  // Obtener tutores
  async getTutors() {
    try {
      const response = await axios.get(`${this.baseURL}/tutors`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching tutors');
    }
  }

  // Obtener usuarios
  async getUsers() {
    try {
      const response = await axios.get(`${this.baseURL}/users`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  // Obtener reservas
  async getBookings() {
    try {
      const response = await axios.get(`${this.baseURL}/booking`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching bookings');
    }
  }
  
}