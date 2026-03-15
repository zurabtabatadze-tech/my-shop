import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  credentials = { email: '', password: '' };
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    this.isLoading = true; 

    setTimeout(() => {
      localStorage.setItem('user', this.credentials.email);
      localStorage.setItem('token', 'demo-token-123');

      this.isLoading = false;
      this.router.navigate(['/']);
    }, 500);
  }
}