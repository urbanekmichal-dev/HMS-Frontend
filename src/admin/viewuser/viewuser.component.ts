import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,Event as NavigationEvent } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MapperService } from 'src/shared/mapper.service';
import { RestapiService } from 'src/shared/restapi.service';
import { UserService } from 'src/shared/user.service';
import { UserProfileResponsePayload } from 'src/user/user-profle/user-profile-response.payload';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  users! : UserProfileResponsePayload[]
  imageUrl = environment.S3url
  deleteUser! : UserProfileResponsePayload;
  p =1
  constructor(private userService : UserService, private router: Router,public mapper : MapperService, private api : RestapiService) { 
 
  }

  ngOnInit(): void {
    this.getAllUsers()
  
  }

    getAllUsers(): void {
    this.userService.getUsers().subscribe(
      (response: UserProfileResponsePayload[]) => {
        this.users = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(user: UserProfileResponsePayload, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'deactivate') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deactivateEmployeeModal');
    }
    if (mode === 'activate') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#activateEmployeeModal');
    }
    container!.appendChild(button);
    button.click();
  }


  public onDeleteEmloyee(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  

}
