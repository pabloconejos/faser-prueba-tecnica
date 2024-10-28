export class Tarea {
    public id: number;
    public titulo: string;
    public minutos: number;
    public isSelected: boolean;

    constructor(id: number, titulo?: string, minutos?: number, isSelected = false){
        this.id = id
        this.titulo = titulo
        this.minutos = minutos
        this.isSelected = isSelected
    }
}