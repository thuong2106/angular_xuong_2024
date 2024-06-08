import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginRes } from '../../types/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', (data as UserLoginRes).token);
        localStorage.setItem('userEmail', (data as UserLoginRes).user.email);
        localStorage.setItem('userId', (data as UserLoginRes).user._id);

        setTimeout(() => this.router.navigate(['/admin/products/list']), 1000);
      },
      error: (error) => {
        // show error
        console.error('Error logging in:', error);
        this.toastr.error(error.error.message);
      },
    });
  }
}
