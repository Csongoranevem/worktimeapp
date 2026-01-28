import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, InputTextModule, PasswordModule, FormsModule, ButtonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  firstName: string = '';
  lastName: string = '';

  user: User = {
    id: 0,
    email: '',
    name: this.firstName + ' ' + this.lastName,
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  };

  saveUser() {
    this.api.registration('users', this.user).subscribe({
      next: (res) => {
        console.log('User registered successfully:', res);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }
}
