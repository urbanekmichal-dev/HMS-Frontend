import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { RoomsResponsePayload } from 'src/app/rooms/rooms-response.payload';

@Component({
  selector: 'app-reservationdetails',
  templateUrl: './reservationdetails.component.html',
  styleUrls: ['./reservationdetails.component.css']
})
export class ReservationdetailsComponent implements OnInit {

  public rooms: RoomsResponsePayload[] = []

  constructor(private localStorage: LocalStorageService) { }



  ngOnInit(): void {
  }

}
