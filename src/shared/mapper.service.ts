import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  
  mapRoleENtoPL(role : String) : any {
    switch(role){
      case  "ADMIN" : return "Administrator"
      case "WORKER" : return "Pracownik"
      case "USER" : return "Klient"
    }
  }

  mapRoomTypeENToPL(type: string): any{
    switch(type){
      case "HOUSE" : return "Dom"
      case "FLAT" : return "Mieszkanie"
      case "ROOM" : return "Pokój"
      case "APARTMENT" : return "Apartament"
      case "OTHER" : return "Inny"
    }
  }

  mapBoolean(type: boolean): any{
    switch(type){
      case true : return 1
      case false : return 0
    }
  }

}
