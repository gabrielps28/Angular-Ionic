import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  // Obtener tutores
  getTutors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/tutors`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/users`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener reservas
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/booking`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}