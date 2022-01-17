import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { MapperService } from 'src/shared/mapper.service';
import { UserService } from 'src/shared/user.service';
import { RestapiService } from '../../shared/restapi.service';
import { SignupRequestPayload } from '../../auth/sign-up/sign-up-request.payload';
import { UserProfileResponsePayload } from './user-profile-response.payload';
import { UserProfileRequestPayload } from './user-profile-request.payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profle',
  templateUrl: './user-profle.component.html',
  styleUrls: ['./user-profle.component.css']
})
export class UserProfleComponent implements OnInit {

  user! : UserProfileResponsePayload
  userEdit : UserProfileRequestPayload

  imageUrl = environment.S3url

  firstname!: string
  lastname!: string
  mandoForm = new FormGroup({
    firstname: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z]*')]),
    lastname: new FormControl('b', Validators.required),
    email:new FormControl('c', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('d', Validators.required),
    username: new FormControl('e', Validators.required),
    address: new FormControl('e', Validators.required),
    phone: new FormControl('e', Validators.required),
    role: new FormControl('e', Validators.required)
  });

  constructor(private userService: UserService, private apiService: RestapiService, private mapper: MapperService, private toaster: ToastrService) {
    this.userEdit = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
    }
  }


  onSubmit(){
    this.firstname=this.mandoForm.get('firstname')?.value
    this.lastname=this.mandoForm.get('lastname')?.value
  }
  ngOnInit(): void {
    this.getUser()
    

  }

  


  public getUser(): void {

    this.userService.getUserByUsername(this.apiService.getUserName()).subscribe(
      (response: UserProfileResponsePayload) => {
        this.user = response;
        this.user.role =this.mapper.mapRoleENtoPL(response.role!)
        this.loadUserData()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadUserData(){
    this.mandoForm.get("firstname")?.setValue(this.user.firstname)
    this.mandoForm.get("lastname")?.setValue(this.user.lastname)
    this.mandoForm.get("phone")?.setValue(this.user.phone)
    this.mandoForm.get("email")?.setValue(this.user.email)
    this.mandoForm.get("address")?.setValue(this.user.address)
    this.mandoForm.get("username")?.setValue(this.user.username)
    this.mandoForm.get("role")?.setValue(this.user.role)

    this.mandoForm.get("role")?.disable()
    this.mandoForm.get("username")?.disable()
  }

  save(){
    this.userEdit.firstname=this.mandoForm.get('firstname')?.value;
    this.userEdit.lastname=this.mandoForm.get('lastname')?.value;
    this.userEdit.phone=this.mandoForm.get('phone')?.value;
    this.userEdit.email=this.mandoForm.get('email')?.value;
    this.userEdit.address=this.mandoForm.get('address')?.value;
    this.userEdit.username=this.mandoForm.get('username')?.value;

  }
  
  public onUpdateUser(): void {
    this.save();     
    this.userService.updateUser(this.userEdit).subscribe(
      (response: UserProfileResponsePayload) => {
        this.getUser();
        this.toaster.success("Dane został zaktualizowane!")
        //alert("The user has been updated correctly in the system!");
      },
      (error: HttpErrorResponse) => {
        alert("The user has not been updated, check the correctness of the data.");
      }
    );
  }

}
