import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http:HttpClient) {

   }

   urlApi:string = 'https://localhost:7026/api/caja';

  httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}


  mostrarIngresosPorAnio(anio:number):Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}/${anio}`, this.httpOptions);

  }

  mostrarIngresosPorMes(anio:number,mes:number):Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}/${anio}/${mes}`, this.httpOptions);
  }

  mostrarIngresosPorDia(anio:number,mes:number,dia:number):Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}/${anio}/${mes}/${dia}`, this.httpOptions);
  }

  
}