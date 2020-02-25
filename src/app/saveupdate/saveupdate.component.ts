import { Component, Renderer, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-saveupdate',
  templateUrl: './saveupdate.component.html',
  styleUrls: ['./saveupdate.component.css']
})
export class SaveupdateComponent implements OnInit {

  constructor(private http: Http,
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder) { }

    transportadora = {};
    addTransportadoraForm: FormGroup;
    email = new FormControl('', [Validators.required, Validators.email]);
    nome = new FormControl('', [Validators.required, Validators.minLength(4)]);
    empresa = new FormControl('', Validators.required);
    cnpj = new FormControl('', Validators.required);
    celular = new FormControl('', []);
    whatsapp = new FormControl('', []);
    cep = new FormControl('', Validators.required);
    cidade = new FormControl('', Validators.required);
    bairro = new FormControl('', Validators.required);
    rua = new FormControl('', Validators.required);
    numero = new FormControl('', Validators.required);
    logo = new FormControl('', []);
    modais = new FormControl('', Validators.required);
    uf = new FormControl('', Validators.required);
    telefone = new FormControl('', Validators.required);
    termo = new FormControl('', Validators.required);
 
  ngOnInit() {
    this.addTransportadoraForm = this.formBuilder.group({
      id: [''],
      email: this.email,
      nome: this.nome,
      empresa: this.empresa,
      cnpj: this.cnpj,
      celular: this.celular,
      whatsapp: this.whatsapp,
      cep: this.cep,
      cidade: this.cidade,
      bairro: this.bairro,
      rua: this.rua,
      numero: this.numero,
      logo: this.logo,
      modais: this.modais,
      telefone: this.telefone,
      termo: this.termo,
      uf: this.uf
    });
    

    const editTransportadoraId = window.localStorage.getItem('editTransportadoraId');
    if (editTransportadoraId) {
      this.dataService.findOne(editTransportadoraId).subscribe(
        res => {
          this.addTransportadoraForm.setValue(res);
        },
        error => {
          alert('Error');
        }
      );
    }
  }

  add() {

    if (!(this.addTransportadoraForm.dirty && this.addTransportadoraForm.valid)) {
      alert('Error de validacao, TODO criar ValidationService '); //TODO implementar uma validacao ValidationService
      return;
    }

    this.dataService.create(this.addTransportadoraForm.value).subscribe(
      res => {
        this.router.navigate(['']);
      },
      error => {
        alert('Error');
      }
    );
  }

}
