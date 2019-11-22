import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from 'src/app/servicios/facturas.service';

@Component({
  selector: 'app-visualizar-factura',
  templateUrl: './visualizar-factura.component.html',
  styleUrls: ['./visualizar-factura.component.scss']
})
export class VisualizarFacturaComponent implements OnInit {

  id: string;
  factura: any;

  constructor(private route: ActivatedRoute,
              private facturasService: FacturasService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.facturasService.getFactura(this.id)
              .subscribe((res:any)=>{
                  this.factura = res.factura;
                  console.log(this.factura);
                },(err:any)=>{
                  console.log(err);
                })

  }

}
