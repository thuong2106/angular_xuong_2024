import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  isntNotmatch() {
    const password = this.registerForm.get('password')?.value;
    const passwordConfirm = this.registerForm.get('passwordConfirm')?.value;
    return password === passwordConfirm ? true : false;
  }

  handleRegistration() {
    if (this.registerForm.invalid) {
      return;
    }
    if (!this.isntNotmatch()) {
      this.toastr.error('Confirm Password is not a valid password');
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        this.toastr.success('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error(error.error.message);
        console.log(error);
      }
    );
  }
}
