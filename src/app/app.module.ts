import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { InicioComponent } from './inicio/inicio.component';
import { BreadcrumbComponent } from './comunes/breadcrumb/breadcrumb.component';
import { NavComponent } from './comunes/nav/nav.component';
import { ModalComponent } from './comunes/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoClientesComponent,
    CrearClienteComponent,
    InicioComponent,
    BreadcrumbComponent,
    NavComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
