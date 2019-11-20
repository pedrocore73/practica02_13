import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { FacturasService } from 'src/app/servicios/facturas.service';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss']
})
export class CrearFacturaComponent implements OnInit {

  formFra: FormGroup;

  constructor(private facturasService: FacturasService,
              private router: Router,
              private mensajesService: MensajesService) { }

  ngOnInit() {
    this.formFra = new FormGroup({
      cliente: new FormControl(null)
    });
    this.onSearch();
  }

  onSearch() {
    this.formFra.get('cliente').valueChanges
                      .subscribe(nombre =>{
                        console.log(nombre);
                      })
  }

}
