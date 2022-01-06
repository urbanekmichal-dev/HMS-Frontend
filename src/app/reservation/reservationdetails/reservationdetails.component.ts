
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { RestapiService } from 'src/app/auth/shared/restapi.service';
import { DataService } from 'src/app/data.service';
import { RoomsResponsePayload } from 'src/app/reservation/rooms/rooms-response.payload';
import { BookingRequestPayload } from '../booking/booking-request.payload';
import { BookingResponePayload } from '../booking/booking-response.payload';
import { BookingService } from '../shared/booking.service';


@Component({
  selector: 'app-reservationdetails',
  templateUrl: './reservationdetails.component.html',
  styleUrls: ['./reservationdetails.component.css']
})
export class ReservationdetailsComponent implements OnInit {

  public room: RoomsResponsePayload = {
    id: 0,
    roomType: '',
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
    user:0
  }

reservationDays = [
    new Date("02/01/1990"),
  ];



  checkInn: string = "aaa"

  constructor(private api: RestapiService, private bookingService: BookingService) { }


  ngOnInit(): void {
    this.room = this.api.getRoomDetails()
    this.setBlockedDaysInCallendar()
    


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


          this.rangesToDaysArray(new Date(formatedStartDate), new Date(formatedEndDate),this.myHolidayDates)
        })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  rangesToDaysArray(start: Date, end: Date, array : Date[]) {

    while (start.getDate() <= end.getDate()) {
      array.push(new Date(start))
      start.setDate(start.getDate() + 1)

    }
  }


  public onAddBooking(): void {
    if (this.validDates(new Date(this.booking.checkIn), new Date(this.booking.checkOut))) {
      this.booking.room = this.room.id
      this.booking.user = 1
      this.bookingService.addBooking(this.booking).subscribe(
        (response: BookingRequestPayload) => {
          alert("Added correctly!");
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log(error.message)
        }
      )
    }
  }

  dateCheckInChange(event: any) {
  var datePipe = new DatePipe('en-US');
  this. booking.checkIn = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
  }


  dateCheckOutChange(event: any) {
    var datePipe = new DatePipe('en-US');
    this.booking.checkOut = datePipe.transform( event.target.value,'yyyy-MM-dd')! 
  }

  validDates(startDate: Date, endDate : Date): boolean
  {
    if(startDate>endDate) return false
    this.rangesToDaysArray(startDate, endDate,this.reservationDays)
    


    this.myHolidayDates.forEach(element => {
      if(startDate<element && endDate>element) return false
      else return true
    });
    return true
  }
}






