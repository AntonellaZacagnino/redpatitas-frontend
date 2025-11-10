import { Component } from '@angular/core';
import { CuerpoPrincipal } from '../../../components/cuerpo-principal/cuerpo-principal';

@Component({
  selector: 'app-home',
  imports: [CuerpoPrincipal],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Página principal con cuerpo unificado
}