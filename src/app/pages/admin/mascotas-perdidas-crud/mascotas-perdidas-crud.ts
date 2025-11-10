import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerdidasService, MascotaPerdida } from '../../../services/perdidas.service';

@Component({
  selector: 'app-mascotas-perdidas-crud',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mascotas-perdidas-crud.html',
  styleUrl: './mascotas-perdidas-crud.css'
})
export class MascotasPerdidasCrud implements OnInit {
  private perdidasService = inject(PerdidasService);
  
  mascotas: MascotaPerdida[] = [];
  mostrarFormulario = false;
  editando = false;
  
  mascotaForm: any = {
    _id: '',
    name: '',
    species: 'Perro',
    breed: '',
    age: 1,
    descripcion: '',
    ubicacionPerdida: '',
    fechaPerdida: new Date().toISOString().split('T')[0],
    contactoReporte: '',
    status: 'Perdido'
  };

  async ngOnInit() {
    await this.cargarMascotas();
  }

  async cargarMascotas() {
    try {
      this.mascotas = await this.perdidasService.getMascotasPerdidas();
      console.log('Mascotas cargadas:', this.mascotas.length);
    } catch (error: any) {
      console.error('Error cargando mascotas perdidas:', error);
    }
  }

  async guardarMascota() {
    console.log('Guardando mascota:', this.mascotaForm);
    try {
      const { _id, ...mascotaData } = this.mascotaForm;
      
      if (this.editando) {
        await this.perdidasService.updateMascotaPerdida(_id, mascotaData);
      } else {
        await this.perdidasService.createMascotaPerdida(mascotaData);
      }
      
      await this.cargarMascotas();
      this.cancelarFormulario();
      console.log('Mascota guardada exitosamente');
    } catch (error: any) {
      console.error('Error guardando mascota:', error);
      console.error('Detalles del error:', error.error);
      console.error('Error completo:', JSON.stringify(error.error, null, 2));
      alert('Error al guardar: ' + (error.error?.error || error.message));
    }
  }

  editarMascota(mascota: MascotaPerdida) {
    this.mascotaForm = { ...mascota };
    this.editando = true;
    this.mostrarFormulario = true;
  }

  async eliminarMascota(id: string) {
    if (confirm('¿Estás seguro de eliminar esta mascota perdida?')) {
      try {
        await this.perdidasService.deleteMascotaPerdida(id);
        await this.cargarMascotas();
      } catch (error: any) {
        console.error('Error eliminando mascota:', error);
      }
    }
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.mascotaForm = {
      _id: '',
      name: '',
      species: 'Perro',
      breed: '',
      age: 1,
      descripcion: '',
      ubicacionPerdida: '',
      fechaPerdida: new Date().toISOString().split('T')[0],
      contactoReporte: '',
      status: 'Perdido'
    };
  }
}