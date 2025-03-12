import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class StudentPage implements OnInit {

  users: any[] = [];
  selectedUser: any = null;
  isLoading: boolean = true;
  errorMessage: string = ''; 
  isModalOpen: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Obtener lista de usuarios
  loadUsers() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users', error);
        this.errorMessage = 'Failed to load users. Please try again later.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  openUserDetails(user: any) {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedUser = null;
  }
}