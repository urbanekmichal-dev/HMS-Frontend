import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeRequestPayload } from 'src/app/home/home-request.payload';
import { environment } from 'src/environments/environment';
import { RoomsResponsePayload } from '../rooms/rooms-response.payload';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms! : RoomsResponsePayload[]

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  
   getRoomsByCriteria(criteria: HomeRequestPayload): Observable<RoomsResponsePayload[]>{
    return this.http.post<RoomsResponsePayload[]>(`${this.apiServerUrl}api/rooms/rooms/`,criteria)
    }

    upload(formData: FormData): Observable<HttpEvent<string[]>> {
      return this.http.post<string[]>(`${this.apiServerUrl}file/upload`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }


    
  
    

}
