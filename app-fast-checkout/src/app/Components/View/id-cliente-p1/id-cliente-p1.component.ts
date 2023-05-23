import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-id-cliente-p1',
  templateUrl: './id-cliente-p1.component.html',
  styleUrls: ['./id-cliente-p1.component.scss']
})
export class IdClienteP1Component {

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    document: ['', Validators.required],
    contract: ['', Validators.required]
  });

  getContractAccount() {
    if (this.form.valid) {
      this.apiService.getContractAccount(this.form.value['document']).subscribe((data) => console.log(data))
    }
    else {
      console.log("deu ruim");
    }
  }
}
