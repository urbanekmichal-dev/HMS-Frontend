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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FiltratePayload } from './filtrate-payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  imageUrl = environment.S3url
  isLoggedIn =false
  role=""
  minDate = new Date()
  p = 1;
 



  mandoForm = new FormGroup({
    location: new FormControl('',[Validators.pattern('[a-zA-Z]*'),Validators.required]),
    checkIn: new FormControl(new Date().toJSON().substring(0,10), Validators.required),
    checkOut:new FormControl(new Date().toJSON().substring(0,10), Validators.required),
    adults: new FormControl('1', Validators.required),
    children: new FormControl('1', Validators.required),
    rooms :new FormControl('1', Validators.required),
    priceFrom: new FormControl('100'),
    priceTo: new FormControl('2000', ),
    roomType: new FormControl('1', Validators.required),
 
  });

  constructor(private api: RestapiService,private localStorage: LocalStorageService, private roomService : RoomService, public mapper: MapperService, private toaster : ToastrService) { 
 
  

  }
  public rooms: RoomsRequestPayload[] = []

  booking : BookingFiltrateRequestPayload = {

    checkIn : "",
    checkOut: "",
    guests :0
  }

  filtarte : FiltratePayload ={
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 1,
    roomsNumber: 1,
    priceFrom:1,
    priceTo:1,
    roomType: 1
  }

  ngOnInit(): void {

    if(this.api.getRoomSearchCriteria()!=null)
    {
    this.filtarte = this.api.getRoomSearchCriteria()
    }
    if (this.filtarte.location!="") {
      this.getAllByCriteria()
      this.api.clearRoomSearchCriteria()
    
    }
    else {
      this.getAllRooms();
    }
    this.isLoggedIn = this.api.isLoggedIn();
    this.role = this.api.getRoleUserLogged();

  }

  getAllRooms(): void {
    this.api.getRooms().subscribe(
      (response: RoomsRequestPayload[]) => {
        this.rooms = response;
        if(response.length==0)  this.toaster.warning("Brak dostepnych obiektów rezerwacyjnych")
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  filtrate(){
    this.filtarte.location = this.mandoForm.get('location')?.value;
    this.filtarte.checkIn = this.mandoForm.get('checkIn')?.value;
    this.filtarte.checkOut = this.mandoForm.get('checkOut')?.value;
    this.filtarte.adults = this.mandoForm.get('adults')?.value;
    this.filtarte.children = this.mandoForm.get('children')?.value;
    this.filtarte.roomsNumber = this.mandoForm.get('rooms')?.value;
    this.filtarte.priceFrom  = this.mandoForm.get('priceFrom')?.value;
    this.filtarte.priceTo  = this.mandoForm.get('priceTo')?.value;
    this.filtarte.roomType = this.mandoForm.get('roomType')?.value-1;
    this.getAllByCriteria()
  }



  getAllByCriteria(){

    this.roomService.getRoomsByCriteria(this.filtarte).subscribe(
      (response: RoomsRequestPayload[]) => {
        this.rooms = response;
        if(response.length==0)  this.toaster.warning("Brak wyników wyszukiwania")
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

    delete(roomId: number){
      this.roomService.deleteRoom(roomId).subscribe(
        (response: void) => {
          this.getAllByCriteria();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
}
