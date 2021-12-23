import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../shared/restapi.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: RestapiService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

}
