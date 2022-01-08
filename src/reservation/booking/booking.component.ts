import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { RestapiService } from 'src/shared/restapi.service';
import { BookingService } from '../../shared/booking.service';

import { BookingFiltrateRequestPayload } from './booking-filtrate-request.payload';
import { BookingResponePayload } from './booking-response.payload';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  userId = 1;
  imageUrl = environment.S3url

  public bookings: BookingResponePayload[] = []
  constructor(private bookingService: BookingService, private api: RestapiService) { }

  ngOnInit(): void {
    this.userId = this.api.getUserLoggedId()
    this.getAllBookings()
  }

  reserve(booking :BookingResponePayload){
    
  }

  

  public getAllBookings(): void {
    this.bookingService.getBookingsByUserId(this.userId).subscribe(
      (response: BookingResponePayload[]) => {
        this.bookings = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
}
