import { Component } from '@angular/core';
//Agregar
import { OnInit } from '@angular/core'; //Event de incio de app
import { Tarea } from './Interfaces/tarea'; //interfas
//import Servicios
import { TareaService } from './Services/tarea.service';
import { error } from 'console';
//Evitando el callback hell
import { switchMap } from 'rxjs/operators';
//Evitando el callback hell - observable
import { zip } from 'rxjs';
//Formularios Reactivos
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private vTareaService : TareaService,
    private frm: FormBuilder,
  ){
    //Construir los campos de la tarea
    this.frmTarea = this.frm.group({
      nombre: ['Valor inical',Validators.required]
    });
  }

  title = 'ProyectoAngularApiCORS-Fronend';
  //contenedor
  arrayTareas: Tarea[] = [];
  frmTarea: FormGroup;

  /*
  funModificarTarea(tarea: Tarea){
    this.vTareaService.update(tarea.idTarea, tarea).subscribe({
      next:(data)=>{
        const dataNew = this.arrayTareas.filter(items=> items.idTarea != tarea.idTarea)
        this.arrayTareas = dataNew;
      }
    });
  }
  */

  funEliminarTarea(tarea: Tarea){
    this.vTareaService.delete(tarea.idTarea).subscribe({
      next:(data)=>{
        const dataNew = this.arrayTareas.filter(items=> items.idTarea != tarea.idTarea)
        this.arrayTareas = dataNew;
      }
    });
  }

  funRegistarTarea(){
    //Preparamos el request, para enviar
    const request:Tarea = {
      idTarea: 0,
      nombre: this.frmTarea.value.nombre
    }
    //registroo
    this.vTareaService.add(request).subscribe({
      next:(data)=> {
        //agregar al array
      this.arrayTareas.push(data);
      //evalua los campos
      this.frmTarea.patchValue({
        nombre:""
      });
      }, error:(e)=> {}
    });
  }

  funListarTareas(){
    this.vTareaService.getList().subscribe({
      next:(data)=> {
        this.arrayTareas = data;
      },error:(e) => {
        console.log("Error");
      }
    });
  }

  ngOnInit(): void {
    this.funListarTareas();
  }

}
