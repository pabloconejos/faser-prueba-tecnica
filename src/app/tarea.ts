export class Tarea {
    public id: number;
    public titulo: string;
    public minutos: number;
    public isSelected: boolean;
    public isHightlighted: boolean;


    constructor(id: number, titulo?: string, minutos?: number, isSelected = false, isHightlighted = false){
        this.id = id
        this.titulo = titulo
        this.minutos = minutos
        this.isSelected = isSelected
        this.isHightlighted = isHightlighted
    }
}