import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { RestapiService } from '../../auth/shared/restapi.service';
import { DataService } from '../../data.service';
import { RoomsResponsePayload } from './rooms-response.payload';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private api: RestapiService,private localStorage: LocalStorageService) { }
  public rooms: RoomsResponsePayload[] = []




  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.api.getRooms().subscribe(
      (response: RoomsResponsePayload[]) => {
        this.rooms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  storeRoomDetails(room :RoomsResponsePayload){
    this.api.storeRoomDetails(room)
  }
  


}
