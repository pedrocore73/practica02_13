import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { NumerosService } from 'src/app/servicios/numeros.service';

@Component({
  selector: 'app-visualizar-factura',
  templateUrl: './visualizar-factura.component.html',
  styleUrls: ['./visualizar-factura.component.scss']
})
export class VisualizarFacturaComponent implements OnInit {

  id: string;
  factura: any;

  constructor(private route: ActivatedRoute,
              private facturasService: FacturasService,
              private numerosService: NumerosService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.facturasService.getFactura(this.id)
              .subscribe((res:any)=>{
                  this.factura = res.factura;
                  let importeIVA = this.numerosService.getRedond(this.factura.base * this.factura.tipo, 2);
                  let total = this.numerosService.getRedond(this.factura.base + importeIVA, 2);
                  this.factura.base = this.numerosService.getFormat(this.factura.base, 2);
                  this.factura.importeIVA = this.numerosService.getFormat(importeIVA, 2);
                  this.factura.total = this.numerosService.getFormat(total, 2);
                },(err:any)=>{
                  console.log(err);
                })

  }

  imprimirFra() {
    document.title = this.factura.numero;
    window.print();
    document.title = 'ACME, S.A.';
  }

}
