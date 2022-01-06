import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../shared/restapi.service';
import { SignupRequestPayload } from './sign-up-request.payload';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/reservation/shared/room.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupRequestPayload!: SignupRequestPayload;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  mandoForm = new FormGroup({
    firstname: new FormControl('Michal', Validators.required),
    lastname: new FormControl('Urbanek', Validators.required),
    email:new FormControl('micho@wp.pl', Validators.required),
    password: new FormControl('123', Validators.required),
    username: new FormControl('Michal', Validators.required),
    address: new FormControl('Wiejska 41 Radzionkow', Validators.required),
    phone: new FormControl('837625625', Validators.required),
    role: new FormControl('1', Validators.required),
    image: new FormControl('1', Validators.required)
  });

  selectedRole=1


 constructor(private authService: RestapiService,private router: Router,private toastr: ToastrService,private roomService : RoomService) {
  this.signupRequestPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password:'',
    username:'',
    address:'',
    phone:'',
    role:0,
    image:""
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
  this.signupRequestPayload.role = this.mandoForm.get('role')?.value;


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


onUploadFiles(files: File[]): void {
  const formData = new FormData();
  for (const file of files) { formData.append('files', file, file.name); }
  this.roomService.upload(formData).subscribe(
    event => {
      console.log(event);
      this.signupRequestPayload.image = this.mandoForm.get('file.name')?.value;
      this.resportProgress(event);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
  );

}


private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
  switch(httpEvent.type) {
    case HttpEventType.Response:
      if (httpEvent.body instanceof Array) {
        this.fileStatus.status = 'done';
        for (const filename of httpEvent.body) {
          this.signupRequestPayload.image = filename;
        }
      } else {
      }
      this.fileStatus.status = 'done';
      break;
      default:
        console.log(httpEvent);
        break;
    
  }
}






  
}
