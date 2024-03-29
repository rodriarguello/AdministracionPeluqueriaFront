import { Alergia } from "../alergia";
import { Cliente } from "../cliente";
import { Enfermedad } from "../enfermedad";
import { Raza } from "../raza";
import { Turno } from "../turno/turno";

export interface Mascota{
    
    id:number,
    nombre:string,
    fechaNacimiento:string,
    idCliente:number,
    cliente:Cliente,
    idRaza:number,
    raza:Raza,
    idEnfermedades:number[],
    enfermedades:Enfermedad[],
    idAlergias:number[],
    alergias?:Alergia[],
    turnos?:Turno[]
}