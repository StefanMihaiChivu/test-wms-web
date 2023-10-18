import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { environment } from '../../environments/environment';
import { UsersFacade } from '../../state/users.facade';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private userFacade: UsersFacade) {}

  getUsers(): Observable<any>{
    return this.http.get<User[]>(`${environment.baseUrl}/users`)
  }
  getUserById(id: number): Observable<any>{
    return this.http.get<User[]>(`${environment.baseUrl}/users/${id}`)
  }

  addUser(user: User){
    return this.http.post<User>(`${environment.baseUrl}/users`, user)
  }

  editUser(user: User){
    return this.http.patch<User>(`${environment.baseUrl}/users/${user.id}`, user)
  }

  deleteUser(id: number){
    return this.http.delete<User>(`${environment.baseUrl}/users/${id}`)
  }

  initAppSession() {
    this.userFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.userFacade.currentUser$;
  }

  observeIsCurrentUserAuth() {
    return this.userFacade.isAuthenticated$;
  }
}
