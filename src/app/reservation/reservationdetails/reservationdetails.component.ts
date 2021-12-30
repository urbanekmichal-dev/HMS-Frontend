import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { RestapiService } from 'src/app/auth/shared/restapi.service';
import { DataService } from 'src/app/data.service';
import { RoomsResponsePayload } from 'src/app/reservation/rooms/rooms-response.payload';


@Component({
  selector: 'app-reservationdetails',
  templateUrl: './reservationdetails.component.html',
  styleUrls: ['./reservationdetails.component.css']
})
export class ReservationdetailsComponent implements OnInit {

  public room: RoomsResponsePayload= {
    id: 0,
    roomType: '',
    floor: 0,
    price: 0,
    picture: ''
  }

  mandoForm = new FormGroup({
    checkIn: new FormControl('', Validators.required),
    checkOut: new FormControl('', Validators.required),
    
  });

  checkIn : string ="aaa"

  constructor(private api:RestapiService) { }


  ngOnInit(): void {
   this.room =this.api.getRoomDetails()
  }

  reserve(){
    this.checkIn = this.mandoForm.get('checkIn')?.value;
  }





}
