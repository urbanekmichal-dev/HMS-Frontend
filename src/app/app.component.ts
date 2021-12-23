import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from './auth/shared/restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hms';

  constructor() { }

  ngOnInit() {
    
  }
}
