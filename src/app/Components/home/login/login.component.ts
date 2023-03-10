
import { Component, OnInit } from '@angular/core';
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

  const credencialesUsuario:Usuario = new Usuario(this.formularioLogin.value.email,this.formularioLogin.value.password);

  this.usuariosService.iniciarSesion(credencialesUsuario).subscribe({

   next:(res)=> {

    

    this.router.navigate(['pages']);
   
  },
  error:()=>{
    this.utilidadService.mostrarAlerta("Error al iniciar sesion","LOGIN")
  }
  
  
  });

  }




}
