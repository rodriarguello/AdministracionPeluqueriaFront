import { Alergia } from "./alergia";
import { Cliente } from "./cliente";
import { Enfermedad } from "./enfermedad";
import { Raza } from "./raza";

export class Mascota{
    
    id!:number;
    nombre!:string;
    fechaNacimiento!:string;
    idCliente!:number;
    cliente!:Cliente;
    idRaza!:number;
    raza!:Raza;
    idEnfermedad!:number;
    enfermedad!:Enfermedad;
    idAlergia!:number;
    alergia!:Alergia;
    idTurno!:number;
}