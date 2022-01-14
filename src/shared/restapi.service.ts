import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


import { map, tap } from 'rxjs/operators';

import { HomeRequestPayload } from 'src/home/home-request.payload';
import { RoomsRequestPayload } from 'src/rooms/room-request.payload';
import { LoginRequestPayload } from 'src/auth/login/login-request.payload';
import { LoginResponse } from 'src/auth/login/login-respone.payload';
import { RoomsResponsePayload } from '../rooms/rooms-response.payload';
import { SignupRequestPayload } from 'src/auth/sign-up/sign-up-request.payload';
import { FiltratePayload } from 'src/rooms/view_room/filtrate-payload';


@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  roomDetails!: RoomsResponsePayload;
  home! :  HomeRequestPayload;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() role: EventEmitter<string> = new EventEmitter();

  constructor(private http:HttpClient, private localStorage: LocalStorageService) { }



  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>(environment.apiBaseUrl +`api/auth/login`,loginRequestPayload)
    .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('userId', data.userId);
        this.localStorage.store('role', data.role)

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        this.role.emit(data.role)
        return true;
      }));
  }


  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(environment.apiBaseUrl+`api/auth/signup`, signupRequestPayload, { responseType: 'text' });
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getUserLoggedId() {
    return this.localStorage.retrieve('userId');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  public getRooms(): Observable<RoomsRequestPayload[]>{
    return this.http.get<RoomsRequestPayload[]>(`${environment.apiBaseUrl}api/rooms/`)
    }

    logout() {
      this.http.post(`${environment.apiBaseUrl}api/auth/logout`, this.refreshTokenPayload,
        { responseType: 'text' })
        .subscribe(data => {
          console.log(data);
        }, error => {
          throwError(error);
        })
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('username');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('expiresAt');
      this.localStorage.clear('userId');
      this.localStorage.clear('role')
    }

    refreshToken() {
      return this.http.post<LoginResponse>(`${environment.apiBaseUrl}api/auth/refresh/token`,
        this.refreshTokenPayload)
        .pipe(tap(response => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');
  
          this.localStorage.store('authenticationToken',
            response.authenticationToken);
          this.localStorage.store('expiresAt', response.expiresAt);
        }));
    }

    getRefreshToken() {
      return this.localStorage.retrieve('refreshToken');
    }

    storeRoomDetails(room :RoomsRequestPayload){
      this.localStorage.store('room', room);
    }

   public getRoomDetails() :RoomsRequestPayload {     
      return this.localStorage.retrieve('room')
    }

    public getRoleUserLogged() : string{
     return this.localStorage.retrieve('role')
    }

    storeRoomSearchCriteria(searchCriteria :FiltratePayload){
      this.localStorage.store('searchCriteria', searchCriteria);
    }

    public getRoomSearchCriteria() :FiltratePayload {     
      return this.localStorage.retrieve('searchCriteria')
    }

    public clearRoomSearchCriteria()  {     
      this.localStorage.clear('searchCriteria')
    }

  
}
