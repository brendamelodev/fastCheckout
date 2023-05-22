import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseURL = 'http://localhost:3001/'
  private readonly urlContract = 'http://localhost:3001/contract-account'

  constructor(private http: HttpClient) { }

  getContractAccount(numero: number): Observable<any> {
    const params = new HttpParams().set("contract", numero);
    return this.http.get<any>(this.urlContract, { params }).pipe(
      tap((retorno) => console.log(retorno))
    )
  }
}
