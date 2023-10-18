import { Injectable } from '@angular/core';
const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    return localStorage.removeItem(TOKEN);
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return this._tokenIsValid(decodedToken.exp);
    }
    return false;
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if(decodedToken){
        return decodedToken.id;
      }
      return null;
    }
    return null;
  }

  _tokenIsValid(expiryTime: any): boolean {
    return Math.floor(new Date().getTime() / 1000) < expiryTime;
  }
}
