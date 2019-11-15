import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';


const routes: Routes = [
  {
   path:'', 
   component: InicioComponent,
   data: {rutas: [{ruta:'/',texto:'Inicio'}]}
  },
  {
   path:'listado-clientes', 
   component: ListadoClientesComponent,
   data: {rutas: [{ruta:'/',texto:'Inicio'},{ruta:'/listado-clientes',texto:'Listado de Clientes'}]}
  },
  {
   path:'crear-cliente', 
   component: CrearClienteComponent,
   data: {rutas: [
                  {ruta:'/',texto:'Inicio'},
                  {ruta:'/listado-clientes',texto:'Listado de Clientes'},
                  {ruta:'/crear-cliente',texto:'Crear Cliente'}
                ]
          }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
