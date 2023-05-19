import { Injectable } from '@angular/core';
//Config
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tarea } from '../Interfaces/tarea';
//CatcErrores
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//Transformar Peticiones
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//APIurl
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  constructor(
    private http: HttpClient
  ) { }

  //Esquema de Trabajo
  private endpoint : string = environment.endPoint;
  private apiURL : string = this.endpoint+'Tarea';

  /*****************[ CALL APIs ]*********************/

  //Lista todos los registros
  getList():Observable<Tarea[]>{
    console.log(this.apiURL+'/Lista');
    return this.http.get<Tarea[]>(this.apiURL+'/Lista');
  }

  //Registra
  add(request: Tarea):Observable<Tarea>{
    console.log(this.apiURL+'/Agregar');
    return this.http.post<Tarea>(this.apiURL+'/Agregar', request);
  }

  //Eliminar
  delete(idTarea: number):Observable<void>{
    return this.http.delete<void>(this.apiURL+'/Elimnar/'+idTarea);
  }

  //modeificar
  update(idTarea: number, request: Tarea):Observable<Tarea>{
    return this.http.put<Tarea>(this.apiURL+'/Modificar/'+idTarea, request);
  }

}
