import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Cria um objeto observável que compartilha os dados entre os componentes
  private dataSubject = new BehaviorSubject<any>(null);

  // Cria um Observable somente leitura para os componentes se inscreverem
  public data$ = this.dataSubject.asObservable();

  constructor() { }

  // Define um método para atualizar os dados do objeto observável
  setData(data: any) {
    this.dataSubject.next(data);
  }
}
