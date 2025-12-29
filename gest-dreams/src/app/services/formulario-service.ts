import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormularioDados } from '../interface'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FormularioService {
  
  private apiUrl = 'http://localhost:8080/v1/enterprises/email'

  constructor(private httpClient: HttpClient){}

  EnviarFormulario(data: FormularioDados): Observable<any> {
    return this.httpClient.post(this.apiUrl, data)
  }
}
