import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {  

  urlFactura = environment.urlFactura;

  constructor(private http: HttpClient) { }

  postFactura(factura) {
    return this.http.post(this.urlFactura, factura)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

}
