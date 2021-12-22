import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestPayload } from './login/login-request.payload';
import { LoginResponse } from './login/login-respone.payload';
import { SignupRequestPayload } from './sign-up/sign-up-request.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  constructor(private http:HttpClient, private localStorage: LocalStorageService) { }

  // public login(username:string,password:string){
  //   const headers = new HttpHeaders({Authorization: 'Basic' + btoa(username+";"+password)})
  //  return  this.http.get(environment.apiBaseUrl,{headers,responseType:'text' as 'json'});
  // }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>(environment.apiBaseUrl +`registration/login`,loginRequestPayload)
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

  public getUsers(){
    let username="";
    let password="";
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(username+";"+password)})
    return this.http.get(environment.apiBaseUrl,{headers});
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(environment.apiBaseUrl+`registration`, signupRequestPayload, { responseType: 'text' });
  }
}
