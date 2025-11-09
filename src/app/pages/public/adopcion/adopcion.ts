import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdopcionService } from '../../../services/adopcion.service';

@Component({
  selector: 'app-adopcion',
  imports: [CommonModule],
  templateUrl: './adopcion.html',
  styleUrl: './adopcion.css'
})
export class Adopcion implements OnInit {
  private adopcionService = inject(AdopcionService);
  
  mascotas: any[] = [];
  cargando = false;
  error = '';

  async ngOnInit() {
    await this.cargarMascotas();
  }

  async cargarMascotas() {
    try {
      this.cargando = true;
      this.error = '';
      this.mascotas = await this.adopcionService.getPets();
    } catch (error: any) {
      this.error = 'Error cargando mascotas: ' + error.message;
      console.error('Error:', error);
    } finally {
      this.cargando = false;
    }
  }
}