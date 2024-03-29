
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formularioLogin:FormGroup;
  ocultarPassword:boolean;
  mostrarLoading:boolean= false;

  @Output() mostrarLogin = new EventEmitter<boolean>();
  @Output() mostrarRegistro = new EventEmitter<boolean>();
  
  constructor(private router:Router, private fb:FormBuilder, private utilidadService:UtilidadService, private usuariosService:UsuariosService){

    this.formularioLogin = this.fb.group({
      
      email:['',Validators.required],
      
      password:['',Validators.required]
    });
    
    this.ocultarPassword = true;
    
  }
  
  
  ngOnInit(): void {
    
  }

  iniciarSesion():void{

  const email = this.formularioLogin.value.email;
  const  password = this.formularioLogin.value.password

  this.usuariosService.login(email, password).subscribe({

   next:()=> {

    
    this.router.navigate(['pages']);
   
  },
  error:()=>{
    
    this.utilidadService.alertaError("Error al iniciar sesion","LOGIN")
  }
  
  
  });

  }

  mostrarIndex():void{
    this.mostrarLogin.emit(false);
  }

  irRegistro():void{
    this.mostrarLogin.emit(false);
    this.mostrarRegistro.emit(true);
  }



}
