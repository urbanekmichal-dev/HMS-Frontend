import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingRequestPayload } from 'src/reservation/booking/booking-request.payload';
import { BookingResponePayload } from 'src/reservation/booking/booking-response.payload';

import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getBookings(): Observable<BookingResponePayload[]>{
    return this.http.get<BookingResponePayload[]>(`${this.apiServerUrl}api/bookings/`)
    }

  public addBooking(user: BookingRequestPayload): Observable<BookingRequestPayload>{
      return this.http.post<BookingRequestPayload>(`${this.apiServerUrl}api/bookings/`,user)
   }

   public getBookingsByRoomId(roomId: number): Observable<BookingResponePayload[]>{
    return this.http.get<BookingResponePayload[]>(`${this.apiServerUrl}api/bookings/room/${roomId}`)
    }
    public getBookingsByUserId(userId: number): Observable<BookingResponePayload[]>{
    return this.http.get<BookingResponePayload[]>(`${this.apiServerUrl}api/bookings/user/${userId}`)
    }
    public getCheckInCheckOutDays(roomId : number): Observable<String[]>{
      return this.http.get<String[]>(`${this.apiServerUrl}api/bookings/checkincheckout/${roomId}`).pipe(
        catchError((err)=>{
          return throwError(err)
        })
      )

    }
}
