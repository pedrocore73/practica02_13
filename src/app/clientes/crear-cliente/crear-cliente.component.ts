import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

  formCliente: FormGroup;

  constructor(private clientesService: ClientesService) { }

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
                      console.log(res);
                    },(err:any)=>{
                      console.log(err);
                    })
  }

}
