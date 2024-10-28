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


	tareas: Tarea[];
	isEditing: {tareaId: number, edit: boolean} = {
		tareaId: -1,
		edit: false
	};

	tareaTitulo: string;
	tareaTiempo: number;

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
		this.tareas.push(new Tarea(Math.random()));
	}

	setEditTareaMode(tarea: Tarea) {
		this.isEditing.edit = true
		this.isEditing.tareaId = tarea.id
		this.tareaTiempo = tarea.minutos
		this.tareaTitulo = tarea.titulo
	}


	editTarea() {
		this.tareas.map( tarea => {
			if (tarea.id == this.isEditing.tareaId) {
				tarea.titulo = this.tareaTitulo
				tarea.minutos = this.tareaTiempo
				this.isEditing = { tareaId: -1, edit: false };
				return tarea
			}
		})
	}

	cancelEdit() {
		this.isEditing = { tareaId: -1, edit: false };
	}

	verCelda(tarea: Tarea) {
		return tarea.id !== this.isEditing.tareaId || !this.isEditing.edit
	}
}
