import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../servicios/facturas.service';
import { NumerosService } from '../servicios/numeros.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  chartOptions = {
    responsive: true
  }

  facturas: any;
  primerDiaMesCurso: any;
  ultimoDiaMesCurso: any;
  primerDiaUltimoMes: any;
  ultimoDiaUltimoMes: any;
  primerDiaPenultimoMes: any;
  ultimoDiaPenultimoMes: any;
  frasMesCurso: number;
  frasUltimoMes: number;
  frasPenultimoMes: number;

  chart:any = [];

  constructor(private facturasService: FacturasService,
              private numerosService: NumerosService) { }

  ngOnInit() {
    this.loadFacturas();
    this.setFechas();
  }

  loadFacturas(){
    this.facturasService.getFacturas()
                .subscribe((res:any)=>{
                    this.facturas = res.facturas;
                    this.frasMesCurso = this.filterFras(this.primerDiaMesCurso, this.ultimoDiaMesCurso);
                    this.frasUltimoMes = this.filterFras(this.primerDiaUltimoMes, this.ultimoDiaUltimoMes);
                    this.frasPenultimoMes = this.filterFras(this.primerDiaPenultimoMes, this.ultimoDiaPenultimoMes);
                    this.loadChart();
                  },(err:any)=>{
                    console.log(err);
                  })
  }

  setFechas(){
    let mesCurso = new Date().getMonth();
    let ultimoMes = mesCurso - 1;
    let penultimoMes = mesCurso -2;
    let anyoMesCurso = new Date().getFullYear();
    let anyoUltimoMes = anyoMesCurso;
    let anyoPenultimoMes = anyoMesCurso;
    if(mesCurso === 1) {
      penultimoMes += 12;
      anyoPenultimoMes -= 1;
    } else if (mesCurso === 0) {
      ultimoMes += 12;
      penultimoMes += 12;
      anyoUltimoMes -= 1;
      anyoPenultimoMes -= 1;
    }
    this.primerDiaMesCurso = this.getDias(mesCurso, anyoMesCurso)[0];
    this.ultimoDiaMesCurso = this.getDias(mesCurso, anyoMesCurso)[1];
    this.primerDiaUltimoMes = this.getDias(ultimoMes, anyoUltimoMes)[0];
    this.ultimoDiaUltimoMes = this.getDias(ultimoMes, anyoUltimoMes)[1];
    this.primerDiaPenultimoMes = this.getDias(penultimoMes, anyoPenultimoMes)[0];
    this.ultimoDiaPenultimoMes = this.getDias(penultimoMes, anyoPenultimoMes)[1];
  }
  
  getDias(mes, anyo){
    let dias = [];
    let dia = new Date(anyo, mes, 1);
    while(dia.getMonth() === mes) {
      dias.push(new Date(dia));
      dia.setDate(dia.getDate() + 1);
    }
    return [dias[0],dias[dias.length - 1]];
  }

  filterFras(primerDia, ultimoDia) {
    let sumaFacturas = 0;
    this.facturas.forEach(factura =>{
      if(new Date(factura.fecha).getTime() >=  primerDia.getTime() &&
         new Date(factura.fecha).getTime() < (ultimoDia.getTime() + 24 * 60 * 60 * 1000)) {
            sumaFacturas += factura.base;
         }
    });
    return sumaFacturas;
  }

  getMes(dia){
    let mes;
    switch (dia.getMonth()) {
      case 0:
        mes = 'Enero ' + dia.getFullYear();
        break;
      case 1:
        mes = 'Febrero ' + dia.getFullYear();
        break;
      case 2:
        mes = 'Marzo ' + dia.getFullYear();
        break;
      case 3:
        mes = 'Abril ' + dia.getFullYear();
        break;
      case 4:
        mes = 'Mayo ' + dia.getFullYear();
        break;
      case 5:
        mes = 'Junio ' + dia.getFullYear();
        break;
      case 6:
        mes = 'Julio ' + dia.getFullYear();
        break;
      case 7:
        mes = 'Agosto ' + dia.getFullYear();
        break;
      case 8:
        mes = 'Septiembre ' + dia.getFullYear();
        break;
      case 9:
        mes = 'Octubre ' + dia.getFullYear();
        break;
      case 10:
        mes = 'Noviembre ' + dia.getFullYear();
        break;
      case 11:
        mes = 'Diciembre ' + dia.getFullYear();
        break;
    }
    return mes;
  }

  formatImporte(importeMes) {
    let importeFormat = this.numerosService.getRedond(importeMes, 2);
    importeFormat = this.numerosService.getFormat(importeFormat, 2);
    return importeFormat;
  }

  loadChart() {
    let meses = [
      this.getMes(this.primerDiaPenultimoMes),
      this.getMes(this.primerDiaUltimoMes),
      this.getMes(this.primerDiaMesCurso)
    ];
    let sumaFras = [
      this.frasPenultimoMes,
      this.frasUltimoMes,
      this.frasMesCurso
    ];
    this.chart = new Chart('grafico',{
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            data: sumaFras,
            borderColor: '#008489'
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    })
  }

}
