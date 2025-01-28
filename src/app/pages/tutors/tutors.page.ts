import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.page.html',
  styleUrls: ['./tutors.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class TutorsPage implements OnInit {
  tutors: any[] = [];
  specialties: any[] = [];
  filteredTutors: any[] = [];
  isLoading: boolean = true; // Controla la carga de datos
  errorMessage: string = ''; // Mensaje de error

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTutors();
  }

  async loadTutors() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const response = await this.apiService.getTutors(); 
      this.tutors = response;
      this.specialties = [...new Set(this.tutors.map(tutor => tutor.speciality).filter(speciality => speciality))];
      this.filteredTutors = this.tutors;
    } catch (error) {
      console.error('Error fetching tutors', error);
      this.errorMessage = 'Failed to load tutors. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  filterBySpecialty(specialty: string) {
    if (specialty === '') {
      this.filteredTutors = this.tutors;
    } else {
      this.filteredTutors = this.tutors.filter(tutor => tutor.speciality === specialty);
    }
  }

}
