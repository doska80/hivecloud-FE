import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCEP(cep): Observable<any> {
    return this.http.get(`//viacep.com.br/ws/${cep}/json`);
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/transportadoras').pipe(map(res => res.json()));
  }

  findOne(id): Observable<any> {
    return this.http.get('http://localhost:8080/api/transportadoras/' + id).pipe(map(res => res.json()));
  }

  criterias(): Observable<any> {
    return this.http.get('http://localhost:8080/api/transportadoras/criterias').pipe(map(res => res.json()));
  }

  findByCriteria(nome, uf, cidade, modal): Observable<any> {
    return this.http.get('http://localhost:8080/api/transportadoras/filtre?nome=' + nome
    + '&uf=' + uf + '&cidade=' + cidade + '&modal=' + modal).pipe(map(res => res.json()));
  }

  delete(id): Observable<any> {
    return this.http.delete('http://localhost:8080/api/transportadoras/' + id);
  }

  create(transportadora): Observable<any> {
    return this.http.post('http://localhost:8080/api/transportadoras', JSON.stringify(transportadora), this.options);
  }

  update(transportadora): Observable<any> {
    return this.http.put('http://localhost:8080/api/transportadoras', JSON.stringify(transportadora), this.options);
  }

}
