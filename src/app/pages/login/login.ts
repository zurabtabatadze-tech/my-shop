import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private api: Api, private router: Router, private authService: AuthService) {}

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.api.loginUser(this.credentials).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        // აქ ვიყენებთ ახალ სერვისს!
        this.authService.login(res.access_token);
        
        alert('🎉 სისტემაში წარმატებით შეხვედით!');
        this.router.navigate(['/']); // გადავდივართ მთავარ გვერდზე
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'არასწორი ელ-ფოსტა ან პაროლი.';
      }
    });
  }
}