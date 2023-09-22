import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  constructor(private usuarioService:UsuariosService,private router:Router){

    this.datosUsuario$ = this.usuarioService.getDatosUsuario;
  }
  ngOnInit(): void {

    this.obtenerDatosUsuario();

    
    this.router.navigate(['pages/dashboard']);
    
  }
  
  datosUsuario$:Observable<Usuario>;

  cerrarSesion():void{

    this.usuarioService.cerrarSesion();

  }

  obtenerDatosUsuario():void{


    //Se verifica si ya existe la data del usuario
    let existeData;
    this.datosUsuario$.subscribe({
      next:(data)=>{
        
        existeData = data;

      }
    });

    //Si NO existe la data del usuario y SI existen las credenciales del usuario se ejecuta el metodo para obtener la data de la api
    //(Es para cuando ya hay un token guardado y se inicia la aplicación en desde /pages);
    
    if(existeData==null && this.usuarioService.getCredencialesUsuario!=null){
      
      this.usuarioService.obtenerDatosUsuario().subscribe();
      
    }
  }


}