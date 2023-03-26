import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Raza } from 'src/app/models/raza';
import { RazasService } from 'src/app/services/razas.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-razas',
  templateUrl: './modal-razas.component.html',
  styleUrls: ['./modal-razas.component.css']
})
export class ModalRazasComponent implements OnInit {

  constructor(private fb:FormBuilder,private modalActual:MatDialogRef<ModalRazasComponent>,
    @Inject(MAT_DIALOG_DATA)public dataRaza:Raza, private razaService:RazasService, 
    private utilidadService:UtilidadService){

    this.formRazas = fb.group({
      nombre:['',[Validators.required,Validators.minLength(3)]]
    });
    this.tituloAccion="Agregar Raza";
    this.botonAccion="Agregar";
    this.nombreRaza="";
  }
  
  ngOnInit(): void {
    //Se controla si es distinto de -1 porque ese parametro se pasa cuando se va a agregar desde el formulario de Mascota
    //Es para agregar una nueva raza, pero se le pasa data especifica por parametro DATA para despues diferenciar el tipo de respuesta
    if(this.dataRaza!=null && this.dataRaza.id !=(-1)){
      this.nombreRaza = this.dataRaza.nombre;
      this.tituloAccion = "Actualizar Raza";
      this.botonAccion = "Actualizar";
      this.formRazas.patchValue({
        nombre:[this.dataRaza.nombre]
      });
    }
  }

  formRazas:FormGroup;
  tituloAccion:string;
  botonAccion:string;
  nombreRaza:string;

  agregarActualizarRaza():void{
     //Se controla si es distinto de -1 porque ese parametro se pasa cuando se va a agregar desde el formulario de Mascota
    //Es para agregar una nueva raza, pero se le pasa data especifica por parametro DATA para despues diferenciar el tipo de respuesta
    if(this.dataRaza!=null && this.dataRaza.id !=(-1)){
      //Metodo modificar
      const raza = new Raza();
      raza.id = this.dataRaza.id;
      raza.nombre = this.formRazas.value.nombre;


      this.razaService.modificarRaza(raza).subscribe({

        next:(res)=>{
          if(res.resultado===1){
            this.modalActual.close("true");
            this.utilidadService.mostrarAlerta("La Raza se modificó con éxito","Exito");
          }
          else{
            this.utilidadService.mostrarAlerta("La Raza no se pudo modificar","Error");
          }
        },
        error:()=>{
          this.utilidadService.mostrarAlerta("La Raza no se pudo modificar","Error");
        }

      });
   
    }
    else{
      //Metodo agregar

      this.razaService.cargarRaza(this.formRazas.value.nombre).subscribe({
        next:(res)=>{
          if(res.resultado===1){
            //Aca se da una respuesta diferenciada segun el parametro pasado
            if(this.dataRaza.id===(-1)){
              //Se le pasa el id del nuevo usuario para que se seleccione en el comboBox
              this.modalActual.close(res.data.id)
            }
            else{
              
              this.modalActual.close("true");
            }
            this.utilidadService.mostrarAlerta("Se agregó una nueva Raza","Exito");
          }
          else{
            this.utilidadService.mostrarAlerta("No se pudo agregar la Raza","Error");
          }
        },
        error:()=>{
          this.utilidadService.mostrarAlerta("No se pudo agregar la Raza","Error");
        }
      });


    }

  }



}