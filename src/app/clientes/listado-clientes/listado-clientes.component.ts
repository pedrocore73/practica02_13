import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Cliente } from 'src/app/models/cliente.model';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  clientes: Array<Cliente>;
  modal = false;
  id: string;

  formSearch: FormGroup;
  @ViewChild('search', {static: false}) searchRef: ElementRef;

  showSpinner = true;

  constructor(private clientesService: ClientesService,
              private mensajesService: MensajesService) { }

  ngOnInit() {
    this.loadClientes();
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
    this.onSearch();
  }

  loadClientes() {
    this.clientesService.getClientes()
              .subscribe((res:any)=>{
                  this.showSpinner = false;
                  this.clientes = res.clientes;
                },(err:any)=>{
                  this.showSpinner = false;
                  console.log(err);
                })
  }

  onSearch() {
    this.formSearch.get('search').valueChanges
                      .subscribe(nombre =>{
                        this.clientes = [];
                        this.showSpinner = true;
                        if (nombre !== '') {
                          this.clientesService.getCliente(nombre)
                                    .subscribe((res:any)=>{
                                        this.showSpinner = false;
                                        this.clientes = res.clientes;
                                      },(err:any)=>{
                                        this.showSpinner = false;
                                        console.log(err);
                                      })
                        } else {
                          this.showSpinner = false;
                          this.loadClientes()
                        }
                      })
  }

  removeCliente(id) {
    this.clientesService.deleteCliente(id)
                .subscribe((res:any)=>{
                    this.mensajesService.setMensaje(res.mensaje, 'exitoTotal');
                    this.loadClientes();
                  },(err:any)=>{
                    this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                  })
  }

  showModal(id) {
    this.id = id;
    this.modal = true;
  }

  hideModal() {
    this.modal = false;
  }

  getAction(event) {
    if(event.action) {
      this.removeCliente(event.parametro);
      this.hideModal();
    } else {
      this.hideModal();
    }
  }

  showSearch() {
    this.searchRef.nativeElement.classList.add('open');
  }

}
