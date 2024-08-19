import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../../../core/injection-tokens';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    @Inject(APP_CONFIG) private appConfig: any
  ) {
    console.log('appConfig', appConfig);
    this.loginForm = this.fb.group({
      email: ['joseromero@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      role: ['ADMIN', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('El formulario no es valido');
    } else {
      const data = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }
      this.authService.login(data);
    }
  }


}
