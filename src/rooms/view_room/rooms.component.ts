import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { environment } from 'src/environments/environment';
import { RestapiService } from '../../shared/restapi.service';
import { DataService } from '../../app/data.service';
import { BookingFiltrateRequestPayload } from '../../reservation/booking/booking-filtrate-request.payload';
import { RoomService } from '../../shared/room.service';
import { RoomsRequestPayload } from '../room-request.payload';
import { RoomsResponsePayload } from '../rooms-response.payload';
import { MapperService } from 'src/shared/mapper.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  imageUrl = environment.S3url
  isLoggedIn =false

  constructor(private api: RestapiService,private localStorage: LocalStorageService, private roomService : RoomService, public mapper: MapperService) { }
  public rooms: RoomsRequestPayload[] = []

  booking : BookingFiltrateRequestPayload = {

    checkIn : "",
    checkOut: "",
    guests :0
  }


  ngOnInit(): void {
    //this.getAllRooms();
    this.getAllByCriteria()
    this.isLoggedIn = this.api.isLoggedIn();
  }

  getAllRooms(): void {
    this.api.getRooms().subscribe(
      (response: RoomsRequestPayload[]) => {
        this.rooms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  getAllByCriteria(){

    this.roomService.getRoomsByCriteria(this.api.getRoomSearchCriteria()).subscribe(
      (response: RoomsRequestPayload[]) => {
        this.rooms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }


  storeRoomDetails(room :RoomsRequestPayload){
    this.api.storeRoomDetails(room)
  }

  

  dateCheckInChange(event: any) {
    var datePipe = new DatePipe('en-US');
    this. booking.checkIn = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
    }

    dateCheckOutChange(event: any) {
      var datePipe = new DatePipe('en-US');
      this.booking.checkOut = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
    }

}
