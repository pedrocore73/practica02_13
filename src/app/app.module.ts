import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { InicioComponent } from './inicio/inicio.component';
import { BreadcrumbComponent } from './comunes/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoClientesComponent,
    CrearClienteComponent,
    InicioComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
