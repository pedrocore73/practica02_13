import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  formCliente: FormGroup;

  constructor(private clientesService: ClientesService,
              private router: Router,
              private mensajesService: MensajesService) { }

  ngOnInit() {
    this.formCliente = new FormGroup({
      nombre: new FormControl(''),
      cif: new FormControl(''),
      calle: new FormControl(''),
      cp: new FormControl(''),
      localidad: new FormControl(''),
      email: new FormControl(''),
      formaPago: new FormControl(''),
    })
  }

  sendCliente() {
    let cliente: Cliente = new Cliente(
      this.formCliente.get('nombre').value,
      this.formCliente.get('cif').value,
      this.formCliente.get('calle').value,
      this.formCliente.get('cp').value,
      this.formCliente.get('localidad').value,
      this.formCliente.get('email').value,
      this.formCliente.get('formaPago').value
      )
    this.clientesService.postCliente(cliente)
                  .subscribe((res:any)=>{
                      this.mensajesService.setMensaje(res.mensaje, 'exitoTotal');
                      this.router.navigate(['/listado-clientes']);
                    },(err:any)=>{
                      if(err.error.error !== undefined) {
                        this.mensajesService.setMensaje('Ya existe un cliente con ese cif', 'error');
                      } else {
                        this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                      }
                    })
  }

}
