import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { NumerosService } from 'src/app/servicios/numeros.service';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.scss']
})
export class ListadoFacturasComponent implements OnInit {

  facturas: any;

  constructor(private facturasService: FacturasService,
              private numerosService: NumerosService) { }

  ngOnInit() {
    this.loadFacturas();
  }

  loadFacturas() {
    this.facturasService.getFacturas()
              .subscribe((res:any)=>{
                  this.facturas = res.facturas;
                  this.facturas.forEach(factura => {
                    factura.base = this.numerosService.getRedond(factura.base, 2);
                    factura.base = this.numerosService.getFormat(factura.base, 2);
                  })
                },(err:any)=>{
                  console.log(err);
                })
  }

}
