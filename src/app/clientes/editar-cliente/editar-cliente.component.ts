import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  formCliente: FormGroup;
  id: string;
  cliente: any;

  constructor(private clientesService: ClientesService,
              private router: Router,
              private route: ActivatedRoute,
              private mensajesService: MensajesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.formCliente = new FormGroup({
      nombre: new FormControl(''),
      cif: new FormControl(''),
      calle: new FormControl(''),
      cp: new FormControl(''),
      localidad: new FormControl(''),
      email: new FormControl(''),
      formaPago: new FormControl(''),
    })
    this.clientesService.getClienteId(this.id)
                  .subscribe((res:any)=>{
                      if (res.cliente === undefined) {
                        this.mensajesService.setMensaje(res.mensaje, 'warning');
                      } else {
                        this.cliente = res.cliente;
                        this.formCliente.get('nombre').setValue(this.cliente.nombre);
                        this.formCliente.get('cif').setValue(this.cliente.cif);
                        this.formCliente.get('calle').setValue(this.cliente.direccion.calle);
                        this.formCliente.get('cp').setValue(this.cliente.direccion.cp);
                        this.formCliente.get('localidad').setValue(this.cliente.direccion.localidad);
                        this.formCliente.get('email').setValue(this.cliente.email);
                        this.formCliente.get('formaPago').setValue(this.cliente.formaPago);
                      }
                    },(err:any)=>{
                      this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                    })
  }

  sendCliente() {
    let cliente = {
      nombre: this.formCliente.get('nombre').value,
      direccion: {
        calle:  this.formCliente.get('calle').value,
        cp: this.formCliente.get('cp').value,
        localidad: this.formCliente.get('localidad').value
      },
      email:  this.formCliente.get('email').value,
      formaPago: this.formCliente.get('formaPago').value
    }
    this.clientesService.putCliente(this.id, cliente)
                  .subscribe((res:any)=>{
                      this.mensajesService.setMensaje(res.mensaje, 'exitoTotal');
                      this.router.navigate(['/listado-clientes']);
                    },(err:any)=>{
                      this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                    })
  }

}
