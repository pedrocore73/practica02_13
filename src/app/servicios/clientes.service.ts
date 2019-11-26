import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlCliente = environment.urlCliente;

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(this.urlCliente)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

  getCliente(nombre) {
    return this.http.get(this.urlCliente + '/search/' + nombre)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

  getClienteId(id) {
    return this.http.get(this.urlCliente + '/' + id)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

  postCliente(cliente: Cliente) {
    return this.http.post(this.urlCliente, cliente)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

  putCliente(id, cliente){
    return this.http.put(this.urlCliente + '/' + id, cliente)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

  deleteCliente(id) {
    return this.http.delete(this.urlCliente + '/' + id)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

}
