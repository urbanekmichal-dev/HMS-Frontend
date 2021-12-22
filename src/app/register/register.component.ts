import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mandoForm = new FormGroup({
    name: new FormControl(),
    series: new FormControl('The Mandalorian')
  });

  onFormSubmit(): void {
    console.log('Name:' + this.mandoForm.get('name')?.value);
    console.log('Series:' + this.mandoForm.get('series')?.value);
  }

  constructor() { }

  ngOnInit(): void {
  }



}
