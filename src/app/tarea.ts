export class Tarea {
    public id: number;
    public titulo: string;
    public minutos: number;

    constructor(id: number, titulo?: string, minutos?: number){
        this.id = id
        this.titulo = titulo
        this.minutos = minutos
    }
}