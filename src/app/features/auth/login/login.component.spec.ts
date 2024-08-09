import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { APP_CONFIG } from '../../../core/injection-tokens';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: {
            baseURL: '...',
            version: '2.0',
          },
        },
        provideAnimationsAsync(), 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El campo email debe ser requerido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.invalid).toBeTrue();
  });

  it('El campo email debe ser válido si tiene el formato correcto', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('valid.email@example.com');
    expect(emailControl?.valid).toBeTrue();
    expect(emailControl?.errors).toBeNull(); // Verifica que no haya errores
  });

  it('El campo password debe ser requerido', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.invalid).toBeTrue();
  });

  it('El campo rol debe ser requerido', () => {
    const rolControl = component.loginForm.get('role');
    rolControl?.setValue('');
    expect(rolControl?.invalid).toBeTrue();
  });

  it('Al llamar onSubmit, si el formulario es invalido, debe mostrar un alert', () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: '',
      password: '',
      role: ''
    });
    const spyOnAlert = spyOn(window, 'alert');
    component.onSubmit();
    expect(spyOnAlert).toHaveBeenCalled();
  });

  it('Al llamar onSubmit, si el formulario es valido, debe llamar a authService.login', () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: 'prueba@email.com',
      password: '123456',
      role: 'ADMIN'
    });
    const spyOnLogin = spyOn(component.authService, 'login');
    component.onSubmit();
    expect(spyOnLogin).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
