import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CalendarioService } from 'src/app/services/calendario.service';
import * as moment from 'moment';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { MY_DATA_FORMATS } from 'src/app/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ExtenderCalendario } from 'src/app/models/calendario/extenderCalendario';

@Component({
  selector: 'app-modal-modificar-turnos',
  templateUrl: './modal-modificar-turnos.component.html',
  styleUrls: ['./modal-modificar-turnos.component.css'],
  providers:[{provide:MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}]
})
export class ModalModificarTurnosComponent {

  constructor(@Inject(MAT_DIALOG_DATA)private data:{minDate:Date,maxDate:Date, accion:string}, private calendarioService:CalendarioService, private dialogoActual:MatDialogRef<ModalModificarTurnosComponent>,
  private utilidadService:UtilidadService){
    
   this.controlarAccion(data.minDate,data.maxDate,data.accion);
   this.excluirDomingo = new FormControl(true,[Validators.required]);
   if(this.data.accion === 'agregar') this.agregar = true;
  }

  agregar:boolean = false;
  nuevaFechaFin:any;
  maxDate:any;
  minDate:any;
  tituloAccion!:string;
  excluirDomingo:FormControl;

  modificarTurnos(){

    if(this.agregar=== true){
      const extenderCalendario:ExtenderCalendario = {
        fechaFin: this.nuevaFechaFin.format(),
        excluirDomingo:this.excluirDomingo.value
      }

      this.calendarioService.extend(extenderCalendario).subscribe({
        next:()=>{
            this.dialogoActual.close(true);
            this.utilidadService.alertaExito("Se agregaron los turnos con éxito","EXITO");
        },
        error:()=>{
          this.utilidadService.alertaError("Error al agregar los turnos","ERROR");
        }
      });
    }

    if(this.agregar=== false){
     
      this.calendarioService.reduce(this.nuevaFechaFin.format()).subscribe({
        next:()=>{
            this.dialogoActual.close(true);
            this.utilidadService.alertaExito("Se eliminaron los turnos con éxito","EXITO");
        },
        error:(err:HttpErrorResponse)=>{

          if(err.status === 499){

            this.utilidadService.alertaError(err.error,"ERROR");

          }else{

            this.utilidadService.alertaError("Error al eliminar los turnos","ERROR");
          }
        }
      });

    }
  }


  controlarAccion(minDate:Date, maxDate:Date,accion:string){
    if(accion=="agregar"){
      this.nuevaFechaFin = moment(minDate);
      this.minDate = minDate;
      this.maxDate = maxDate;
      this.tituloAccion = "Agregar";
    }

    if(accion == "eliminar" ){
      this.nuevaFechaFin = moment(maxDate);
      this.minDate = minDate;
      this.maxDate = maxDate;
      this.tituloAccion = "Eliminar";
    }


  }

}
