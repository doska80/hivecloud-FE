import { Component, Renderer, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { DataService } from '../services/data.service';
import { Transportadora } from '../dto/Transportadora';
import { Modal } from '../dto/Modal';

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
    editForm = false;
    buttonLabel = 'Cadastro';
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
      idTransportadora: [''],
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
    if (editTransportadoraId)  {
      this.editForm = true;
      this.buttonLabel = 'Alterar';
      this.dataService.findOne(editTransportadoraId).subscribe(
        res => {
          const editTransportadora = new Transportadora(res);
          const modais: Array<string> = [];

          for (let modal of editTransportadora.modais) {
            modais.push(modal.idModal);
          }
          editTransportadora.modais = modais;
          this.addTransportadoraForm.setValue(editTransportadora);
        },
        error => {
          alert('Error');
        }
      );
    }
  }

  consultaCEP() {
    let cep = this.addTransportadoraForm.value.cep;
    console.log(cep);

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.dataService.getCEP(cep).subscribe(
          res => {
            const obj: any = JSON.parse(res._body);
            this.addTransportadoraForm.get('rua').setValue(obj.logradouro);
            this.addTransportadoraForm.get('bairro').setValue(obj.bairro);
            this.addTransportadoraForm.get('uf').setValue(obj.uf);
            this.addTransportadoraForm.get('cidade').setValue(obj.localidade);
          },
          error => {
            alert('Error');
          }
        );
      }
    }
  }

  delete() {
    this.dataService.delete(window.localStorage.getItem('editTransportadoraId')).subscribe(
      res => {
        this.router.navigate(['']);
      },
      error => {
        alert('Error');
      }
    );
  }

  save() {

    if (!(this.addTransportadoraForm.dirty && this.addTransportadoraForm.valid)) {
      alert('Error de validacao, TODO criar ValidationService '); //TODO implementar uma validacao ValidationService
      return;
    }
    if (this.editForm) {

      const editTransportadora = new Transportadora(this.addTransportadoraForm.value);
      const modais: Array<Modal> = [];

      for (let idModal of editTransportadora.modais) {
        modais.push(new Modal(parseInt(idModal), idModal));
     }

     editTransportadora.modais = modais;

      this.dataService.update(editTransportadora).subscribe(
        res => {
          this.router.navigate(['']);
        },
        error => {
          alert('Error');
        }
      );
    } else {
      const newTransportadora = new Transportadora(this.addTransportadoraForm.value);
      const modais: Array<Modal> = [];

      for (let idModal of newTransportadora.modais) {
        modais.push(new Modal(parseInt(idModal), idModal));
     }

      newTransportadora.modais = modais;

      this.dataService.create(newTransportadora).subscribe(
        res => {
          this.router.navigate(['']);
        },
        error => {
          alert('Error');
        }
      );
    }

  }

}
