import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { RestapiService } from '../auth/shared/restapi.service';
import { HomeRequestPayload } from './home-request.payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeRequestPayload!: HomeRequestPayload

  homeForm = new FormGroup({
    location: new FormControl('', Validators.required),
    checkIn: new FormControl(new Date().toJSON().substring(0,10), Validators.required),
    checkOut:new FormControl(new Date().toJSON().substring(0,10), Validators.required),
    adults: new FormControl('1', Validators.required),
    children: new FormControl('1', Validators.required),
    rooms :new FormControl('1', Validators.required)
  });

  constructor(private router: Router, public api : RestapiService){
    this.homeRequestPayload={
    location: '',
    checkIn:'',
    checkOut:'',
    adults:1,
    children:1,
    rooms:1
    }
  }


  ngOnInit(): void {
  }

  search(){
    this.homeRequestPayload.location = this.homeForm.get('location')?.value;
    this.homeRequestPayload.checkIn = this.homeForm.get('checkIn')?.value;
    this.homeRequestPayload.checkOut = this.homeForm.get('checkOut')?.value;
    this.homeRequestPayload.adults = this.homeForm.get('adults')?.value;
    this.homeRequestPayload.children = this.homeForm.get('children')?.value;
    this.homeRequestPayload.rooms = this.homeForm.get('rooms')?.value;
    
    this.api.storeRoomSearchCriteria(this.homeRequestPayload)
    this.router.navigate(['/rooms'])
  }



}



  // title = 'my-app';
  
  //   myHolidayDates = [
  //                   new Date("01/01/2022"),
  //                   new Date("12/20/2020")
  //               ];
  //           range = new FormGroup({
  //                 start: new FormControl(),
  //                 end: new FormControl()
  //               });
  
  //   myHolidayFilter = (d: Date | null): boolean => {
  //     if(d != null)
  //     {
  //       const time=d.getTime();
  //       return !this.myHolidayDates.find(x=>x.getTime()==time);
  //     }
  //     return true;
  //   }

  //   rangesToDaysArray(start: Date, end :Date){
  //     while(start <= end) {
  //       this.myHolidayDates.push(start)
  //       start.setDate(start.getDate()+1)
  //   }
  // }