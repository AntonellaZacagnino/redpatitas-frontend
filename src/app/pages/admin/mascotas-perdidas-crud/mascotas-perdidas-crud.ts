import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerdidasService, MascotaPerdida } from '../../../services/perdidas.service';

/**
 * Componente CRUD para gestionar reportes de mascotas perdidas
 * Permite crear, leer, actualizar y eliminar reportes de mascotas perdidas
 * Usado en: Panel administrativo /admin/mascotas-perdidas
*/

@Component({
  selector: 'app-mascotas-perdidas-crud',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mascotas-perdidas-crud.html',
  styleUrl: './mascotas-perdidas-crud.css'
})
export class MascotasPerdidasCrud implements OnInit {
  private perdidasService = inject(PerdidasService);
  
  // === PROPIEDADES DEL COMPONENTE ===
  mascotas: MascotaPerdida[] = [];         // Lista de reportes de mascotas perdidas
  mostrarFormulario = false;               // Controla la visibilidad del formulario
  editando = false;                        // Indica si estamos editando (true) o creando (false)
  
  // === FORMULARIO DE REPORTE ===
  // Estructura para reportar mascotas perdidas con campos específicos
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
    status: 'Perdido'  // Solo puede ser Perdido (lógica simplificada)
  };

  // === MÉTODOS DEL CICLO DE VIDA ===
  
  /**
   * Se ejecuta al inicializar el componente
   * Carga la lista inicial de reportes de mascotas perdidas
  */

  async ngOnInit() {
    await this.cargarMascotas();
  }

  // === MÉTODOS CRUD ===
  
  /**
   * Carga todos los reportes de mascotas perdidas desde la API
   * Actualiza la lista mostrada en la tabla
  */

  async cargarMascotas() {
    try {
      this.mascotas = await this.perdidasService.getMascotasPerdidas();
      console.log('Mascotas cargadas:', this.mascotas.length);
    } catch (error: any) {
      console.error('Error cargando mascotas perdidas:', error);
    }
  }

  /**
   * Guarda un reporte de mascota perdida (crear nuevo o actualizar existente)
   * Usa el flag 'editando' para determinar la operación
  */

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

  /**
   * Prepara el formulario para editar un reporte existente
   * Carga los datos en el formulario y activa el modo edición
  */

  editarMascota(mascota: MascotaPerdida) {
    this.mascotaForm = { ...mascota };
    this.editando = true;
    this.mostrarFormulario = true;
  }

  /**
   * Elimina un reporte de mascota perdida del sistema
   * Solicita confirmación antes de proceder
  */

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

  // === MÉTODOS DE VALIDACIÓN Y UTILIDAD ===
  
  /**
   * Valida que todos los campos requeridos estén completos
   * Incluye validación de campos específicos para reportes de pérdidas
  */

  formularioCompleto(): boolean {
    return !!
      (this.mascotaForm.name?.trim() &&
       this.mascotaForm.species?.trim() &&
       this.mascotaForm.breed?.trim() &&
       this.mascotaForm.age &&
       this.mascotaForm.descripcion?.trim() &&
       this.mascotaForm.ubicacionPerdida?.trim() &&    // Campo único de perdidas
       this.mascotaForm.fechaPerdida &&                 // Campo único de perdidas
       this.mascotaForm.contactoReporte?.trim());       // Campo único de perdidas
  }

  /**
   * Resetea el formulario y oculta el modal
   * Vuelve al estado inicial para crear nuevo reporte
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
      descripcion: '',
      ubicacionPerdida: '',
      fechaPerdida: new Date().toISOString().split('T')[0],
      contactoReporte: '',
      status: 'Perdido'  // Solo puede ser Perdido
    };
  }
}