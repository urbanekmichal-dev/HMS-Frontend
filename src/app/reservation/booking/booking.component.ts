import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/booking.service';
import { BookingResponePayload } from './booking-response.payload';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  public bookings: BookingResponePayload[] = []
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getAllBookings()
  }

  reserve(booking :BookingResponePayload){
    
  }

  public getAllBookings(): void {
    this.bookingService.getBookings().subscribe(
      (response: BookingResponePayload[]) => {
        this.bookings = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
