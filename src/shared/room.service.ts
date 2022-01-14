import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeRequestPayload } from 'src/home/home-request.payload';
import { environment } from 'src/environments/environment';
import { RoomsRequestPayload } from '../rooms/room-request.payload';
import { RoomsResponsePayload } from '../rooms/rooms-response.payload';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms! : RoomsResponsePayload[]

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  
   getRoomsByCriteria(criteria: HomeRequestPayload): Observable<RoomsRequestPayload[]>{
    return this.http.post<RoomsRequestPayload[]>(`${this.apiServerUrl}api/rooms/rooms/`,criteria)
    }
    
    public addRoom(room: RoomsResponsePayload): Observable<RoomsResponsePayload>{
      return this.http.post<RoomsResponsePayload>(`${this.apiServerUrl}api/rooms/`,room)
    }

    public deleteRoom(roomId: number): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}api/rooms/visible/${roomId}`)
    }  

  
    

}
