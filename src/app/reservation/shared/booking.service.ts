import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingResponePayload } from '../booking/booking-response.payload';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getBookings(): Observable<BookingResponePayload[]>{
    return this.http.get<BookingResponePayload[]>(`${this.apiServerUrl}api/bookings/`)
    }
}
