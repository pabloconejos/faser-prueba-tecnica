import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	@HostListener('document:keydown.enter', ['$event'])
	onEnterPress(event: KeyboardEvent) {
	  this.editTarea()
	}

	@HostListener('document:keydown.esc', ['$event'])
	onEscPress(event: KeyboardEvent) {
		this.cancelEdit();
	}

	isEditing: {tareaId: number, edit: boolean} = {
		tareaId: -1,
		edit: false
	};

	tareas: Tarea[];
	tareaTitulo: string;
	tareaTiempo: number;
	ordenarTiempoAsc: boolean = false

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	anyadirTarea() {
		// Math.max(...this.tareas.map(t => t.id)) + 1 => esto coje tods los idea y con Math.max coje el mas grande y le añade 1. Asi no hay repetidos
		const nuevoId = this.tareas.length > 0 ? Math.max(...this.tareas.map(t => t.id)) + 1 : 1;
    	this.tareas.push(new Tarea(nuevoId));
	}

	setEditTareaMode(tarea: Tarea) {
		this.isEditing.edit = true
		this.isEditing.tareaId = tarea.id
		this.tareaTiempo = tarea.minutos
		this.tareaTitulo = tarea.titulo
	}


	editTarea() {
		this.tareas.forEach(tarea => {
			if (tarea.id === this.isEditing.tareaId) {
				tarea.titulo = this.tareaTitulo;
				tarea.minutos = this.tareaTiempo;
			}
		});
		this.cancelEdit();
	}

	cancelEdit() {
		this.isEditing = { tareaId: -1, edit: false };
	}

	verCelda(tarea: Tarea) {
		return tarea.id !== this.isEditing.tareaId || !this.isEditing.edit
	}

	eliminar(tarea: Tarea, event: MouseEvent) {
		event.preventDefault();
		this.tareas = this.tareas.filter(t => t.id != tarea.id)
	}

	eliminarSelected() {
		this.tareas = this.tareas.filter(t => t.isSelected != true)
	}

	ordenarTiempo() {
		this.ordenarTiempoAsc = !this.ordenarTiempoAsc
		this.tareas = this.ordenarTiempoAsc ? this.tareas.sort((a, b) => b.minutos - a.minutos) : this.tareas.sort((a, b) => a.minutos - b.minutos)
	}

	ordenarTarea() {
		this.tareas = this.tareas.sort((a, b) => a.titulo.localeCompare(b.titulo))
	}

	destacar(tarea: Tarea, event: MouseEvent) {
		event.preventDefault();
		tarea.isHightlighted = !tarea.isHightlighted
	}
}
