import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { NumerosService } from 'src/app/servicios/numeros.service';

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
              private clientesService: ClientesService,
              private numerosService: NumerosService) { }

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
    this.formFra.get('formaPago').patchValue(this.cliente.formaPago, {emitEvent: false});
    this.clientes = [];
  }

  onChanges() {
    this.formFra.valueChanges
            .subscribe(data=>{
              let importeIVA = this.numerosService.getRedond(data.base * data.tipo, 2);
              let total = this.numerosService.getRedond(data.base + importeIVA, 2);
              let importeIVAformat = this.numerosService.getFormat(importeIVA, 2);
              let totalFormat = this.numerosService.getFormat(total, 2);
              this.formFra.get('importeIVA').patchValue(importeIVAformat, {emitEvent: false});
              this.formFra.get('total').patchValue(totalFormat, {emitEvent: false});
            })

  }

  sendFactura() {
    let factura = {
      cliente: this.cliente,
      fecha: this.formFra.get('fecha').value,
      concepto: this.formFra.get('concepto').value,
      base: this.formFra.get('base').value,
      tipo: this.formFra.get('tipo').value,
      formaPago: this.formFra.get('formaPago').value
    }
    this.facturasService.postFactura(factura)
                  .subscribe((res:any)=>{
                      this.mensajesService.setMensaje(res.mensaje, 'exitoTotal');
                    },(err:any)=>{
                      this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                    })
  }

}
