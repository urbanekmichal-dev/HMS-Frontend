import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileResponsePayload } from '../../user/user-profle/user-profile-response.payload';
import { ImageService } from '../../shared/image.service';
import { RoomService } from '../../shared/room.service';
import { RoomsResponsePayload } from '../rooms-response.payload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddroomComponent implements OnInit {

  

  photoloaded =false
  room! : RoomsResponsePayload
  
  mandoForm = new FormGroup({
    children: new FormControl('1', Validators.required),
    adults: new FormControl('1', Validators.required),
    roomsNumber:new FormControl('1', Validators.required),
    price: new FormControl('100', Validators.required),
    location: new FormControl('Gliwice', Validators.required),
    description: new FormControl('Coś tam', Validators.required),
    roomType: new FormControl('1', Validators.required),
    picture: new FormControl('')
  });

  ngOnInit(): void {
  }

  constructor(private roomService : RoomService, private imageService: ImageService, private toaster : ToastrService, private router: Router) {

    this.room = {
      id: 1,
      roomType: 0,
      floor: 1,
      price: 1,
      picture: "",
      adults:1,
      roomsNumber:1,
      children:1,
      location:"",
      description:""
    };

   }


  public onAddRoom():void{

    this.room.children = this.mandoForm.get('children')?.value;
    this.room.adults = this.mandoForm.get('adults')?.value;
    this.room.roomsNumber = this.mandoForm.get('roomsNumber')?.value;
    this.room.price = this.mandoForm.get('price')?.value;
    this.room.location = this.mandoForm.get('location')?.value;
    this.room.description = this.mandoForm.get('description')?.value;
    this.room.roomType = this.mandoForm.get('roomType')?.value-1;


    this.roomService.addRoom(this.room).subscribe(
      (response: RoomsResponsePayload) =>{
        this.toaster.success("Obiekt noclegowy został dodany pomyślnie");
        this.router.navigate(['/rooms'])
      },
      (error:HttpErrorResponse)=>{
        this.toaster.success("Wystąpił błąd podczas dodawania obiektu noclegowego");
      }
    )

  }

  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); 
  }
    this.imageService.uploadTest(formData).subscribe(
      event => {
        this.room.picture=event.name;
        this.photoloaded=true
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
