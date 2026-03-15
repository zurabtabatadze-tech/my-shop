import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    age: null, 
    zipcode: '', 
    gender: 'MALE',
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private api: Api, private router: Router) {}

  onRegister() {
    this.isLoading = true;
    this.errorMessage = '';
    let formattedPhone = this.user.phone.trim();
    if (formattedPhone && !formattedPhone.startsWith('+995')) {
      formattedPhone = '+995' + formattedPhone;
    }

    const payload = {
      ...this.user,
      age: Number(this.user.age),
      phone: formattedPhone 
    };

    this.api.registerUser(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        alert('🎉 რეგისტრაცია წარმატებით დასრულდა!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error && err.error.errorKeys && err.error.errorKeys.length > 0) {
          this.errorMessage = 'შეცდომა: ' + err.error.errorKeys.join(', ');
        } else if (err.error && err.error.message) {
          if (Array.isArray(err.error.message)) {
            this.errorMessage = err.error.message.join(' | ');
          } else {
            this.errorMessage = err.error.message;
          }
        } else {
          this.errorMessage = 'რეგისტრაციისას დაფიქსირდა შეცდომა. შეამოწმეთ ველები.';
        }
      }
    });
  }
}