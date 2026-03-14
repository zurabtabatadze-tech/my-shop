import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit { // <-- აი, აქ დავარქვით ზუსტად Profile
  userData: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      let payload = token.split('.')[1];
      payload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(payload));
      
      this.userData = {
        firstName: decoded.firstName || 'ჩემი',
        lastName: decoded.lastName || 'პროფილი',
        email: decoded.email || 'ელ-ფოსტა დამალულია',
        avatar: decoded.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        phone: decoded.phone || 'არ არის მითითებული',
        address: decoded.address || 'არ არის მითითებული',
        age: decoded.age || '-',
        gender: decoded.gender || 'MALE'
      };
    } catch (error) {
       this.errorMessage = 'მონაცემების წაკითხვა ვერ მოხერხდა.';
    }
  }
}