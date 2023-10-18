import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { LocalStorageService } from './localStorage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/auth/login`, {
      username: email,
      password: password,
    });
  }

  logout() {
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
