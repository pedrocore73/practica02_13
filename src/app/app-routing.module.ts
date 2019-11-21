import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { ListadoFacturasComponent } from './facturas/listado-facturas/listado-facturas.component';
import { CrearFacturaComponent } from './facturas/crear-factura/crear-factura.component';
import { VisualizarFacturaComponent } from './facturas/visualizar-factura/visualizar-factura.component';


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
  {
    path:'listado-facturas', 
    component: ListadoFacturasComponent,
    data: {rutas: [{ruta:'/',texto:'Inicio'},{ruta:'/listado-facturas',texto:'Listado de Facturas'}]}
  },
  {
    path:'crear-factura', 
    component: CrearFacturaComponent,
    data: {rutas: [
                   {ruta:'/',texto:'Inicio'},
                   {ruta:'/listado-facturas',texto:'Listado de Facturas'},
                   {ruta:'/crear-factura',texto:'Crear Factura'}
                 ]
           }
  },
  {
    path:'visualizar-factura/:id', 
    component: VisualizarFacturaComponent,
    data: {rutas: [
                   {ruta:'/',texto:'Inicio'},
                   {ruta:'/listado-facturas',texto:'Listado de Facturas'},
                   {ruta:'/visualizar-factura/:id',texto:'Vista previa'}
                 ]
           }
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
