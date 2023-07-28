import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MY_DATA_FORMATS } from 'src/app/Reutilizable/shared/spinner/spinner.component';
import { Calendario } from 'src/app/models/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-calendario',
  templateUrl: './modal-crear-calendario.component.html',
  styleUrls: ['./modal-crear-calendario.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})
export class ModalCalendarioComponent {

  constructor(private dialogoActual:MatDialogRef<ModalCalendarioComponent>, private fb:FormBuilder, private calendarioService:CalendarioService,
    private utilidadService:UtilidadService){

    this.formCalendario = fb.group({
      nombre:['',Validators.required],
      fechaInicio:['',Validators.required],
      fechaFin:['',Validators.required],
      horaInicio:[8,Validators.required],
      horaFin:[18,Validators.required],
      intervaloTurnos:[30,Validators.required]
    });

  }

  formCalendario:FormGroup;

  listHorarios:number[]= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

  listInvervaloTurnos:number[]=[10,15,20,25,30,45,60,90,120,180];


  crearCalendario():void{
    const calendario = new Calendario();
    calendario.nombre = this.formCalendario.value.nombre;
    calendario.fechaInicio = this.formCalendario.value.fechaInicio;
    calendario.fechaFin = this.formCalendario.value.fechaFin;
    calendario.horaInicioTurnos = this.formCalendario.value.horaInicio;
    calendario.horaFinTurnos = this.formCalendario.value.horaFin;
    calendario.intervaloTurnos = this.formCalendario.value.intervaloTurnos;
    
    this.calendarioService.crearCalendario(calendario).subscribe({
      next:(res)=>{
        if(res.resultado ===1){
          this.utilidadService.mostrarAlerta("El calendario se creo con éxito", "OK");
          this.dialogoActual.close(true);
        }
        else{
          this.utilidadService.mostrarAlerta("No se pudo crear el calendario", "ERROR");
          
        }
      },
      error:()=>{
        this.utilidadService.mostrarAlerta("No se pudo crear el calendario", "ERROR");
        
      }
    });
    

  }

 

}
