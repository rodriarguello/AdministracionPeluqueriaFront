import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalMascotasComponent } from 'src/app/modules/Layout/modales/modal-mascotas/modal-mascotas.component';
import { Mascota } from 'src/app/models/mascota/mascota';
import { Turno } from 'src/app/models/turno/turno';
import { TurnoModificar } from 'src/app/models/turno/turnoModificar';
import { MascotasService } from 'src/app/services/mascotas.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-reservar-turno',
  templateUrl: './modal-reservar-turno.component.html',
  styleUrls: ['./modal-reservar-turno.component.css']
})
export class ModalReservarTurnoComponent implements OnInit {

  constructor(private fb:FormBuilder,private dialogoActual:MatDialogRef<ModalReservarTurnoComponent>,
              @Inject(MAT_DIALOG_DATA)public dataTurno:Turno, private turnoService:TurnosService, private mascotaService:MascotasService,
              private utilidadService:UtilidadService,private nuevoDialog :MatDialog ){
    
    
      this.formReserva = fb.group({
      idMascota:['',Validators.required],
      precio:['', Validators.required]

    });

    this.mostrarMascotas();
    
  }
  ngOnInit(): void {


  }

  formReserva:FormGroup;

  listMascotas:Mascota[] = [];

  mostrarMascotas():void{
    this.mascotaService.mostrarMascotas().subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.listMascotas = res.data;
        }
        else{
          console.log(res.mensaje)
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  reservarTurno():void{
    
    const turnoModificar = new TurnoModificar();
    turnoModificar.idMascota = this.formReserva.value.idMascota;
    turnoModificar.precio = this.formReserva.value.precio;

    
    this.turnoService.reservarTurno(this.dataTurno.id,turnoModificar).subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.utilidadService.mostrarAlerta("El turno fue reservado","OK");
          this.dialogoActual.close(true);
        }
        else{
          this.utilidadService.mostrarAlerta("No se pudo reservar el turno","ERROR");
          console.log(res.mensaje);
        }
      },
      error:(err)=>{
        this.utilidadService.mostrarAlerta("No se pudo reservar el turno","ERROR");
        console.log(err);
      }
    });

  }

  agregarMascota():void{
    let mascota = new Mascota();
    mascota.id = -1;
    this.nuevoDialog.open(ModalMascotasComponent,{disableClose:true,data:mascota}).afterClosed().subscribe(
      (res)=>{
        if(res!=null){
          this.mostrarMascotas();
          this.formReserva.patchValue({
            idMascota:res
          });
        }
      }
    );

  }


}