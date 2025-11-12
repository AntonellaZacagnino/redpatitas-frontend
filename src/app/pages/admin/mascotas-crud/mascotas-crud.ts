import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdopcionService, MascotaAdopcion } from '../../../services/adopcion.service';

/**
 * Componente CRUD para gestionar mascotas en adopción
 * Permite crear, leer, actualizar y eliminar mascotas disponibles para adopción
 * Usado en: Panel administrativo /admin/mascotas
*/

@Component({
  selector: 'app-mascotas-crud',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mascotas-crud.html',
  styleUrl: './mascotas-crud.css'
})
export class MascotasCrud implements OnInit {
  private adopcionService = inject(AdopcionService);
  
  // === PROPIEDADES DEL COMPONENTE ===
  mascotas: MascotaAdopcion[] = [];        // Lista de mascotas cargadas desde la API
  mostrarFormulario = false;               // Controla la visibilidad del formulario
  editando = false;                        // Indica si estamos editando (true) o creando (false)
  
  // === FORMULARIO DE MASCOTA ===
  // Estructura que coincide con la interfaz MascotaAdopcion
  mascotaForm: MascotaAdopcion = {
    _id: '',
    name: '',
    species: 'Perro',
    breed: '',
    age: 1,
    description: '',
    refugio: '',
    contacto: '',
    status: 'Disponible'
  };

  // === MÉTODOS DEL CICLO DE VIDA ===
  
  /**
   * Se ejecuta al inicializar el componente
   * Carga la lista inicial de mascotas
  */

  async ngOnInit() {
    await this.cargarMascotas();
  }

  // === MÉTODOS CRUD ===
  
  /**
   * Carga todas las mascotas desde la API
   * Actualiza la lista mostrada en la tabla
  */

  async cargarMascotas() {
    try {
      this.mascotas = await this.adopcionService.getPets();
    } catch (error) {
      console.error('Error cargando mascotas:', error);
    }
  }

  /**
   * Guarda una mascota (crear nueva o actualizar existente)
   * Usa el flag 'editando' para determinar la operación
  */

  async guardarMascota() {
    try {
      const { _id, ...mascotaData } = this.mascotaForm;
      
      if (this.editando) {
        await this.adopcionService.put(`/adopcion-mascotas/${_id}`, mascotaData);
      } else {
        await this.adopcionService.post('/adopcion-mascotas', mascotaData);
      }
      
      await this.cargarMascotas();
      this.cancelarFormulario();
    } catch (error: any) {
      console.error('Error guardando mascota:', error);
    }
  }

  /**
   * Prepara el formulario para editar una mascota existente
   * Carga los datos en el formulario y activa el modo edición
  */

  editarMascota(mascota: MascotaAdopcion) {
    this.mascotaForm = { ...mascota };
    this.editando = true;
    this.mostrarFormulario = true;
  }

  /**
   * Elimina una mascota del sistema
   * Solicita confirmación antes de proceder
  */

  async eliminarMascota(id: string) {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        await this.adopcionService.delete(`/adopcion-mascotas/${id}`);
        await this.cargarMascotas();
      } catch (error: any) {
        console.error('Error eliminando mascota:', error);
      }
    }
  }

  // === MÉTODOS DE VALIDACIÓN Y UTILIDAD ===
  
  /**
   * Valida que todos los campos requeridos estén completos
   * Retorna true si el formulario es válido para enviar
  */

  formularioCompleto(): boolean {
    return !!
      (this.mascotaForm.name?.trim() &&
       this.mascotaForm.species?.trim() &&
       this.mascotaForm.breed?.trim() &&
       this.mascotaForm.age &&
       this.mascotaForm.description?.trim() &&
       this.mascotaForm.refugio?.trim() &&
       this.mascotaForm.contacto?.trim() &&
       this.mascotaForm.status?.trim());
    // Validamos todos los campos requeridos de la interfaz MascotaAdopcion
  }

  /**
   * Resetea el formulario y oculta el modal
   * Vuelve al estado inicial para crear nueva mascota
  */
 
  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.mascotaForm = {
      _id: '',
      name: '',
      species: 'Perro',
      breed: '',
      age: 1,
      description: '',
      refugio: '',
      contacto: '',
      status: 'Disponible'
    };
  }
}