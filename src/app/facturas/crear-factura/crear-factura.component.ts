import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss']
})
export class CrearFacturaComponent implements OnInit {

  formFra: FormGroup;
  clientes: any;
  cliente: any;
  fechaActual = new Date();

  constructor(private facturasService: FacturasService,
              private router: Router,
              private mensajesService: MensajesService,
              private clientesService: ClientesService) { }

  ngOnInit() {
    this.formFra = new FormGroup({
      cliente: new FormControl(null),
      cif: new FormControl(''),
      fecha: new FormControl(this.fechaActual),
      concepto: new FormControl(''),
      base: new FormControl(''),
      tipo: new FormControl(0.21),
      importeIVA: new FormControl(null),
      total: new FormControl(null),
      formaPago: new FormControl('')
    });
    this.onSearch();
    this.onChanges();
  }

  onSearch() {
    this.formFra.get('cliente').valueChanges
                      .subscribe(nombre =>{
                        if (nombre !== '') {
                          this.clientesService.getCliente(nombre)
                                    .subscribe((res:any)=>{
                                        this.clientes = res.clientes;
                                      },(err:any)=>{
                                        console.log(err);
                                      })
                        } else {
                          this.clientes = [];
                        }
                      })
  }

  setCliente(i) {
    this.cliente = this.clientes[i];
    this.formFra.get('cliente').patchValue(this.cliente.nombre, {emitEvent: false});
    this.formFra.get('cif').patchValue(this.cliente.cif, {emitEvent: false});
    this.clientes = [];
  }

  onChanges() {
    this.formFra.valueChanges
            .subscribe(data=>{
              let importeIVA = data.base * data.tipo;
              let total = data.base + importeIVA;
              this.formFra.get('importeIVA').patchValue(importeIVA, {emitEvent: false});
              this.formFra.get('total').patchValue(total, {emitEvent: false});
            })

  }

}
