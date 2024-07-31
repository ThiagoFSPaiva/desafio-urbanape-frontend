import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(UserService);

 

  login(event: Event) {
    event.preventDefault();
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe(() => {
        this.router.navigate(['/home']);
      });

      
  }
}
