import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-respone.payload';
import { SignupRequestPayload } from '../sign-up/sign-up-request.payload';
import { map, tap } from 'rxjs/operators';
import { RoomsResponsePayload } from '../../reservation/rooms/rooms-response.payload';
import { HomeRequestPayload } from 'src/app/home/home-request.payload';


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
  constructor(private http:HttpClient, private localStorage: LocalStorageService) { }


  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>(environment.apiBaseUrl +`api/auth/login`,loginRequestPayload)
    .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
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

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  public getRooms(): Observable<RoomsResponsePayload[]>{
    return this.http.get<RoomsResponsePayload[]>(`${environment.apiBaseUrl}api/rooms/`)
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

    storeRoomDetails(room :RoomsResponsePayload){
      this.localStorage.store('room', room);
    }

   public getRoomDetails() :RoomsResponsePayload {     
      return this.localStorage.retrieve('room')
    }

    storeRoomSearchCriteria(searchCriteria :HomeRequestPayload){
      this.localStorage.store('searchCriteria', searchCriteria);
    }

    public getRoomSearchCriteria() :HomeRequestPayload {     
      return this.localStorage.retrieve('searchCriteria')
    }

}
