import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-id-cliente-p1',
  templateUrl: './id-cliente-p1.component.html',
  styleUrls: ['./id-cliente-p1.component.scss']
})
export class IdClienteP1Component {
  @ViewChild('input', { static: false }) inputComponent!: InputComponent;

  getinputValue() {
    const inputValue = this.inputComponent.inputValue;
    console.log('Valor do componente filho:', inputValue);
  }

  // formIdCliente: FormGroup = this.fb.group({
  //   document: ['', Validators.required],
  //   contract: ['', Validators.required]
  // });

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  getContractAccount(data: any) {
    this.apiService.getContractAccount(data).subscribe((data) => console.log(data))
  }

}
