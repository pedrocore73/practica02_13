import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Cliente } from 'src/app/models/cliente.model';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  clientes: Array<Cliente>;

  constructor(private clientesService: ClientesService,
              private mensajesService: MensajesService) { }

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.clientesService.getClientes()
              .subscribe((res:any)=>{
                  this.clientes = res.clientes;
                },(err:any)=>{
                  console.log(err);
                })
  }

  removeCliente(id) {
    this.clientesService.deleteCliente(id)
                .subscribe((res:any)=>{
                    this.mensajesService.setMensaje(res.mensaje, 'exitoTotal');
                    this.loadClientes();
                  },(err:any)=>{
                    this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                  })
  }

}
