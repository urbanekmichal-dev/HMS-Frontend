import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profle',
  templateUrl: './user-profle.component.html',
  styleUrls: ['./user-profle.component.css']
})
export class UserProfleComponent implements OnInit {

firstname=""
lastname=""

  mandoForm = new FormGroup({
    firstname: new FormControl('a', Validators.required),
    lastname: new FormControl('b', Validators.required),
    email:new FormControl('c', Validators.required),
    password: new FormControl('d', Validators.required),
    username: new FormControl('e', Validators.required),
    address: new FormControl('e', Validators.required),
    phone: new FormControl('e', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.firstname=this.mandoForm.get('firstname')?.value
    this.lastname=this.mandoForm.get('lastname')?.value
  }

}
