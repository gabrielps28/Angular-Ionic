import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class ClassesPage implements OnInit {

  reservations: any[] = [];
  filteredReservations: any[] = [];
  students: any[] = [];
  selectedStudent: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.apiService.getBookings().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.filteredReservations = this.reservations;
        this.students = this.reservations.map(reservation => reservation.user);
      },
      error: (error) => {
        console.error('Error fetching reservations', error);
        this.errorMessage = 'Failed to load reservations. Please try again later.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Función para filtrar reservas por estudiante
  filterByStudent(studentId: string) {
    if (studentId === '') {
      this.filteredReservations = this.reservations;
    } else {
      this.filteredReservations = this.reservations.filter(reservation => reservation.user.id === studentId);
    }
  }
}