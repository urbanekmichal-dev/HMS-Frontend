import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from 'src/app/auth/sign-up/sign-up-request.payload';
import { UserProfileResponsePayload } from 'src/app/auth/user-profle/user-profile-response.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getUserByUsername(userName: string): Observable<UserProfileResponsePayload>{
    return this.http.get<UserProfileResponsePayload>(`${this.apiServerUrl}api/auth/${userName}`)
    }

    public updateUser(user: UserProfileResponsePayload): Observable<UserProfileResponsePayload>{
      return this.http.put<UserProfileResponsePayload>(`${this.apiServerUrl}api/auth/`,user)
    }  
}
