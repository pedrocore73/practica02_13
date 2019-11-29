import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { NumerosService } from 'src/app/servicios/numeros.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.scss']
})
export class ListadoFacturasComponent implements OnInit {

  facturas: any;
  showSpinner = true;

  constructor(private facturasService: FacturasService,
              private numerosService: NumerosService,
              private mensajesService: MensajesService) { }

  ngOnInit() {
    this.loadFacturas();
  }

  loadFacturas() {
    this.facturasService.getFacturas()
              .subscribe((res:any)=>{
                  this.showSpinner = false;
                  this.facturas = res.facturas;
                  this.facturas.forEach(factura => {
                    factura.base = this.numerosService.getRedond(factura.base, 2);
                    factura.base = this.numerosService.getFormat(factura.base, 2);
                  })
                },(err:any)=>{
                  this.showSpinner = false;
                  console.log(err);
                })
  }

  sendFactura(id) {
    this.facturasService.sendEmailFactura(id)
              .subscribe((res:any)=>{
                  this.mensajesService.setMensaje(res.mensaje, 'exitoTotal');
                },(err:any)=>{
                  this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                })
  }

}
