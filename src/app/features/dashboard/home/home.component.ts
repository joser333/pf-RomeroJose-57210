import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  title = 'Mi Aplicación Angular';
  welcomeMessage = '¡Bienvenido!';
  welcomeMessage2 = 'Sistema de Gestión Universitaria!';
}
