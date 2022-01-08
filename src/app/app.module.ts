import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';

import {HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RoomsComponent } from '../rooms/view_room/rooms.component';
import { LogoutComponent } from '../auth/logout/logout.component';
import { HeaderComponent } from '../header/header.component';
import { UserProfleComponent } from '../user/user-profle/user-profle.component';
import { ReservationdetailsComponent } from '../reservation/reservationdetails/reservationdetails.component';
import { BookingComponent } from '../reservation/booking/booking.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddroomComponent } from '../rooms/add_room/addroom.component';
import { RestapiService } from 'src/shared/restapi.service';
import { ViewuserComponent } from '../admin/viewuser/viewuser.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    RegisterComponent,
    LogoutComponent,
    RoomsComponent,
    HeaderComponent,
    UserProfleComponent,
    ReservationdetailsComponent,
    BookingComponent,
    AddroomComponent,
    ViewuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxWebstorageModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule

  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
