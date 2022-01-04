import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { RestapiService } from '../../auth/shared/restapi.service';
import { DataService } from '../../data.service';
import { BookingFiltrateRequestPayload } from '../booking/booking-filtrate-request.payload';
import { RoomsResponsePayload } from './rooms-response.payload';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private api: RestapiService,private localStorage: LocalStorageService) { }
  public rooms: RoomsResponsePayload[] = []

  booking : BookingFiltrateRequestPayload = {

    checkIn : "",
    checkOut: "",
    guests :0
  }


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
  

  dateCheckInChange(event: any) {
    var datePipe = new DatePipe('en-US');
    this. booking.checkIn = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
    }

    dateCheckOutChange(event: any) {
      var datePipe = new DatePipe('en-US');
      this.booking.checkOut = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
    }

}
