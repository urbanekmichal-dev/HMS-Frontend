import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RoomsComponent } from './reservation/rooms/rooms.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserProfleComponent } from './auth/user-profle/user-profle.component';
import { ReservationdetailsComponent } from './reservation/reservationdetails/reservationdetails.component';
import { AuthGuard } from './auth/auth.guard';
import { BookingComponent } from './reservation/booking/booking.component';

const routes: Routes = [

  {path:"login",component:LoginComponent},
  {path:"signup",component:SignUpComponent},
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"rooms",component:RoomsComponent},
  // {path:"rooms",component:RoomsComponent,canActivate: [AuthGuard]},
  {path:"logout",component:LogoutComponent},
  {path:"userprofile",component:UserProfleComponent},
  {path:"reservationdetails",component:ReservationdetailsComponent},
  {path:"bookings",component:BookingComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
