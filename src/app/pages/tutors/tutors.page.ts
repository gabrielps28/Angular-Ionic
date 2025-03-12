import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.page.html',
  styleUrls: ['./tutors.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class TutorsPage implements OnInit {
  tutors: any[] = [];
  specialties: string[] = [];
  filteredTutors: any[] = [];
  isLoading: boolean = true; // Controla la carga de datos
  errorMessage: string = ''; // Mensaje de error

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTutors();
  }

  // Cargar tutores
  loadTutors() {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getTutors().pipe(
      catchError(error => {
        console.error('Error fetching tutors', error);
        this.errorMessage = 'Failed to load tutors. Please try again later.';
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe({
      next: (tutors) => {
        this.tutors = tutors;
        this.filteredTutors = tutors;
        this.specialties = [...new Set(tutors.map(tutor => tutor.speciality).filter(speciality => speciality))];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Filtrar tutores por especialidad
  filterBySpecialty(specialty: string) {
    if (specialty === '') {
      this.filteredTutors = this.tutors;
    } else {
      this.filteredTutors = this.tutors.filter(tutor => tutor.speciality === specialty);
    }
  }
}