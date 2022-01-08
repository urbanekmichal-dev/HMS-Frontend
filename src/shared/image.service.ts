import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.apiServerUrl}file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadTest(formData: FormData):Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}file/upload`, formData);
  }
}
