import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transportadoras',
  templateUrl: './transportadoras.component.html',
  styleUrls: ['./transportadoras.component.css']
})
export class TransportadorasComponent implements OnInit {


  constructor(
    private router: Router,
    private dataService: DataService) { }

  transportadoras = [];
  criterias = [];
  isLoading = true;

  cEstado = '';
  cCidade = '';
  cModal = '';
  cNome = '';

  searchWord = '';

  ngOnInit() {
    this.getAll();
    this.getCriterias();
  }

  getAll() {
      this.dataService.getAll()
      .subscribe((res: any) => {
        this.transportadoras = res;
        console.log(this.transportadoras);
      }, err => {
        console.error('oops, an error!', err);
      });

  }

  getCriterias() {
    this.dataService.criterias()
    .subscribe((res: any) => {
      this.criterias = res;
      console.log(this.transportadoras);
    }, err => {
      console.error('oops, an error!', err);
    });
 }

 filtreEstado(uf) {
  this.cEstado = uf;
  this.filtre();
 }
 clearFiltreEstado() {
  this.cEstado = '';
  this.filtre() ;
 }

 filtreCidade(cidade) {
  this.cCidade = cidade;
  this.filtre();
 }
 clearFiltreCidade() {
  this.cCidade = '';
  this.filtre() ;
 }


 filtreModal(modal) {
  this.cModal = modal;
  this.filtre();
 }
 clearFiltreModal() {
  this.cModal = '';
  this.filtre() ;
 }


 filtreNome() {
  this.cNome = this.searchWord;
  this.filtre();
 }
 clearFiltreNome() {
  this.cNome = '';
  this.filtre() ;
 }

 filtre() {
  this.dataService.findByCriteria(this.cNome, this.cEstado, this.cCidade, this.cModal )
  .subscribe((res: any) => {
    this.transportadoras = res;
    console.log(this.transportadoras);
  }, err => {
    console.error('oops, an error!', err);
  });
 }

 editTransportadora(transportadora): void {
  window.localStorage.removeItem('editTransportadoraId');
  window.localStorage.setItem('editTransportadoraId', transportadora.idTransportadora.toString());
  this.router.navigate(['saveupdate']);
}

cadastrarTransportadora(): void {
  window.localStorage.removeItem('editTransportadoraId');
  this.router.navigate(['saveupdate']);
}

}
