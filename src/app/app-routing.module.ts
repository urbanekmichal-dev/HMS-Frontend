import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { LogoutComponent } from '../auth/logout/logout.component';
import { RegisterComponent } from '../register/register.component';
import { RoomsComponent } from '../rooms/view_room/rooms.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { UserProfleComponent } from '../user/user-profle/user-profle.component';
import { ReservationdetailsComponent } from '../reservation/reservationdetails/reservationdetails.component';
import { AuthGuard } from '../auth/auth.guard';
import { BookingComponent } from '../reservation/booking/booking.component';
import { AddroomComponent } from '../rooms/add_room/addroom.component';
import { HasRoleGuard } from '../auth/has-role.guard';
import { ViewuserComponent } from 'src/admin/viewuser/viewuser.component';


const routes: Routes = [

  {path:"login",component:LoginComponent},
  {path:"signup",component:SignUpComponent},
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"rooms",component:RoomsComponent},
  {path:"logout",component:LogoutComponent},
  {path:"userprofile",component:UserProfleComponent,canActivate: [AuthGuard]},
  {path:"reservationdetails",component:ReservationdetailsComponent,canActivate: [AuthGuard]},
  {path:"bookings",component:BookingComponent,canActivate: [AuthGuard,HasRoleGuard], data: {role: 'USER'}},
  {path:"addroom",component:AddroomComponent,canActivate: [AuthGuard, HasRoleGuard], data: {role: ['WORKER','ADMIN']}},
  {path:"viewuser",component:ViewuserComponent,canActivate: [AuthGuard, HasRoleGuard], data: {role: 'ADMIN'}},


  { path: '',   redirectTo: '/home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
