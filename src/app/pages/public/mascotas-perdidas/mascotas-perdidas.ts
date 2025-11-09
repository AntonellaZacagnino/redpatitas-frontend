import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdidasService, MascotaPerdida } from '../../../services/perdidas.service';

@Component({
  selector: 'app-mascotas-perdidas',
  imports: [CommonModule],
  templateUrl: './mascotas-perdidas.html',
  styleUrl: './mascotas-perdidas.css'
})
export class MascotasPerdidas implements OnInit {
  private perdidasService = inject(PerdidasService);
  
  mascotasPerdidas: MascotaPerdida[] = [];
  cargando = false;

  async ngOnInit() {
    await this.cargarMascotasPerdidas();
  }

  async cargarMascotasPerdidas() {
    try {
      this.cargando = true;
      this.mascotasPerdidas = await this.perdidasService.getMascotasPerdidas();
      console.log('Mascotas perdidas cargadas:', this.mascotasPerdidas);
    } catch (error) {
      console.error('Error cargando mascotas perdidas:', error);
      this.mascotasPerdidas = [];
    } finally {
      this.cargando = false;
    }
  }
}