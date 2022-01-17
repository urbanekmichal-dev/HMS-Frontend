import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from 'src/auth/sign-up/sign-up-request.payload';
import { UserProfileResponsePayload } from 'src/user/user-profle/user-profile-response.payload';
import { environment } from 'src/environments/environment';
import { UserProfileRequestPayload } from 'src/user/user-profle/user-profile-request.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getUserByUsername(userName: string): Observable<UserProfileResponsePayload>{
    return this.http.get<UserProfileResponsePayload>(`${this.apiServerUrl}api/auth/${userName}`)
    }

    public updateUser(user: UserProfileRequestPayload): Observable<UserProfileResponsePayload>{
      return this.http.put<UserProfileResponsePayload>(`${this.apiServerUrl}api/auth/`,user)
    }  

    public getUsers(): Observable<UserProfileResponsePayload[]>{
      return this.http.get<UserProfileResponsePayload[]>(`${this.apiServerUrl}api/auth/users/`)
      }

      public deleteUser(userId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}api/auth/user/${userId}`)
      } 
}
