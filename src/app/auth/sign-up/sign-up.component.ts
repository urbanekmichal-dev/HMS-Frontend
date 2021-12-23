import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../shared/restapi.service';
import { SignupRequestPayload } from './sign-up-request.payload';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;

  mandoForm = new FormGroup({
    firstname: new FormControl('a', Validators.required),
    lastname: new FormControl('b', Validators.required),
    email:new FormControl('c', Validators.required),
    password: new FormControl('d', Validators.required),
    username: new FormControl('e', Validators.required),
    address: new FormControl('e', Validators.required),
    phone: new FormControl('e', Validators.required),
  });

  onFormSubmit(): void {
    console.log('Name:' + this.mandoForm.get('name')?.value);
    console.log('Series:' + this.mandoForm.get('series')?.value);
  }

 constructor(private authService: RestapiService,private router: Router,private toastr: ToastrService) {
  this.signupRequestPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password:'',
    username:'',
    address:'',
    phone:''
  };
  }

 ngOnInit(): void {
 }

 signup() {
  this.signupRequestPayload.firstname = this.mandoForm.get('firstname')?.value;
  this.signupRequestPayload.lastname = this.mandoForm.get('lastname')?.value;
  this.signupRequestPayload.email = this.mandoForm.get('email')?.value;
  this.signupRequestPayload.password = this.mandoForm.get('password')?.value;
  this.signupRequestPayload.username = this.mandoForm.get('username')?.value;
  this.signupRequestPayload.address = this.mandoForm.get('address')?.value;
  this.signupRequestPayload.phone = this.mandoForm.get('phone')?.value;

  this.authService.signup(this.signupRequestPayload)
    .subscribe(data => {
      this.router.navigate(['/login'],
        { queryParams: { registered: 'true' } });
    }, error => {
      console.log(error);
    this.toastr.error('Registration Failed! Please try again')
      ;
    });
    console.log('Password:' + this.mandoForm.get('password')?.value);
}





  
}
