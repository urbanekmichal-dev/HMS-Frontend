
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';

import { DataService } from 'src/app/data.service';

import { RoomsResponsePayload } from 'src/rooms/rooms-response.payload';
import { environment } from 'src/environments/environment';
import { BookingRequestPayload } from '../booking/booking-request.payload';
import { BookingResponePayload } from '../booking/booking-response.payload';
import { RoomsRequestPayload } from '../../rooms/room-request.payload';
import { BookingService } from '../../shared/booking.service';
import { RestapiService } from 'src/shared/restapi.service';
import { MapperService } from 'src/shared/mapper.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DateFilterFn } from '@angular/material/datepicker';



@Component({
  selector: 'app-reservationdetails',
  templateUrl: './reservationdetails.component.html',
  styleUrls: ['./reservationdetails.component.css']
})
export class ReservationdetailsComponent implements OnInit {

  imageUrl = environment.S3url

  public room: RoomsRequestPayload = {
    id: 0,
    roomType: "",
    floor: 0,
    price: 0,
    picture: '',
    adults:0,
    roomsNumber:0,
    children:0,
    location:'',
    description: ''
  }

  booking : BookingRequestPayload = {

    checkIn : "",
    checkOut: "",
    room :0,
    user:0,
    owner:0

  }

reservationDays = [
    new Date("02/01/1990"),
  ];

  minDate = new Date()

  checkInn: string = "aaa"

  checkIncheckout =false

  constructor(private api: RestapiService, private bookingService: BookingService, public mapper: MapperService, private toaster: ToastrService, private router : Router) { }


  ngOnInit(): void {
    this.room = this.api.getRoomDetails()
    //this.setBlockedDaysInCallendar()
    this.setBlockedDays()
    


  }

  reserve() {
    
  }

  calculateDiff(from: Date, to: Date) {
    return Math.floor((Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / (1000 * 60 * 60 * 24)).toString();
  }

  myHolidayDates = [
    new Date("02/01/1990"),
  ];


  myHolidayFilter = (d: Date | null): boolean => {
    if (d != null) {
      const time = d.getTime();
     return !this.myHolidayDates.find(x => x.getTime() == time);
    }
    return true;
  }

   setBlockedDaysInCallendar() {
    this.bookingService.getBookingsByRoomId(this.room.id).subscribe(
      (response: BookingResponePayload[]) => {
        response.forEach((element) => {
         let startDate = moment(element.checkIn,'YYYY-MM-DD')
         let formatedStartDate = startDate.format('MM/DD/YYYY')
         let endDate = moment(element.checkOut,'YYYY-MM-DD')
         let formatedEndDate = endDate.format('MM/DD/YYYY')


        //  this.toaster.success(formatedStartDate+"   "+formatedEndDate)
          // this.rangesToDaysArray(new Date('01/30/2022'), new Date('01/31/2022'))
           //this.rangesToDaysArray(new Date('2022-01-12'), new Date('2022-01-20'))

        // this.rangesToDaysArray(new Date(formatedStartDate), new Date(formatedEndDate))
          //this.rangesToDaysArray(new Date(formatedStartDate), new Date(formatedEndDate),this.myHolidayDates)
        })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  rangesToDaysArray(start: Date, end: Date) {
    while (start.getDate() <= end.getDate()) {
      this.myHolidayDates.push(new Date(start))
      start.setDate(start.getDate() + 1)

  }
}


  public onAddBooking(): void {
    if (this.validDates(new Date(this.booking.checkIn), new Date(this.booking.checkOut))) {
      this.booking.room = this.room.id
      this.booking.user = 1
      this.booking.owner = this.api.getUserLoggedId();
      this.bookingService.addBooking(this.booking).subscribe(
        (response: BookingRequestPayload) => {
          this.toaster.success("Rezerwacja przebiegła pomyślnie")
          this.router.navigate(['/bookings'])

        },
        (error: HttpErrorResponse) => {
  
          this.toaster.error(error.error.message)
        }
      )
    }
    else {
      this.toaster.error("Wprowadzono błędne daty!")
    }
  }

  dateCheckInChange(event: any) {
  var datePipe = new DatePipe('en-US');
  this. booking.checkIn = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
  if(this. booking.checkIn>=this. booking.checkOut &&  this. booking.checkOut!=""){
    this.toaster.error("Data wymeldowania nie może poprzedzać ani być równa dacie zameldowania")

    this.checkIncheckout=false;
  }
  else if(this.booking.checkIn!="" && this.booking.checkOut!="")
  {
  this.room.price = this.calculateDays(this.booking.checkIn,this.booking.checkOut)*this.room.price
  this.checkIncheckout=true;
  }

  }

  dateCheckOutChange(event: any) {
    var datePipe = new DatePipe('en-US');
    this.booking.checkOut = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
    if(this. booking.checkIn>=this. booking.checkOut && this. booking.checkIn!=""){
      this.toaster.error("Data wymeldowania nie może poprzedzać ani być równa dacie zameldowania")

      this.checkIncheckout=false;
    }
    
    else if(this.booking.checkIn!="" && this.booking.checkOut!= "")
    {
    this.room.price = this.calculateDays(this.booking.checkIn,this.booking.checkOut)*this.room.price
    this.checkIncheckout=true;
    }

  }

  validDates(startDate: Date, endDate : Date): boolean
  {
    if(startDate>=endDate) return false


    return true
  }

  calculateDays(checkInDate : String, checkOutDate : String) :number {
    let days=0
    let checkInD = new Date(checkInDate.toString())
    let checkOutD = new Date(checkOutDate.toString())
    while(checkInD<checkOutD){
      checkInD.setDate(checkInD.getDate()+1)
      days++
    }
    return days;
  }



  setBlockedDays() {
    this.bookingService.getCheckInCheckOutDays(this.room.id).subscribe(
      (response: String[]) => {
        
         response.forEach((element) => {
          let startDate = moment(element.toString(),'YYYY-MM-DD')
          let formatedStartDate = startDate.format('MM/DD/YYYY')
          this.myHolidayDates.push(new Date(formatedStartDate))
          
         })
      },
      (err: HttpErrorResponse) => {
        this.toaster.error(err.error.message)
      }
    );
  }

 
}






