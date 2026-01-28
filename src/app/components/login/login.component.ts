import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  password: string = '';
  email: string = '';

  constructor(
    private apiService: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  login() {
    const credentials = { email: this.email, password: this.password };
    this.apiService.login(credentials).subscribe({
      next: (res: any) => {
        // Accept either a raw token string or an object with a token property
        const token = typeof res === 'string' ? res : (res?.token || res?.accessToken || res?.data?.token);
        if (token) {
          this.auth.login(token);
          this.router.navigate(['/home']);
        } else {
          console.error('Login succeeded but no token returned', res);
        }
      },
      error: (err) => {
        console.error('Login error', err);
      }
    });
  }


  
}
