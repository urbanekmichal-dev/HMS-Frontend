import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapperService } from 'src/shared/mapper.service';
import { RestapiService } from '../shared/restapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = ""
  isLoggedIn =  false
  role = "";
  

  constructor(private authService: RestapiService, private router: Router,public mapper: MapperService) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.role.subscribe((data: string) => this.role = data);

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.role = this.authService.getRoleUserLogged()
    
  }

  
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/home');
  }





}
