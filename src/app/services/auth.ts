import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ამოწმებს, არის თუ არა უკვე ტოკენი (ე.ი. შესულია თუ არა)
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('access_token'));

  // ამას მოუსმენს Navbar-ი
  isLoggedIn$ = this.loggedIn.asObservable();

  // შესვლისას ვინახავთ ტოკენს და ვცვლით სტატუსს
  login(token: string) {
    localStorage.setItem('access_token', token);
    this.loggedIn.next(true);
  }

  // გასვლისას ვშლით ტოკენს
  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }
}