import { RoomsResponsePayload } from "../../rooms/rooms-response.payload";

export interface BookingResponePayload {
    id: number;
    checkIn: string;
    checkOut: string;
    room : RoomsResponsePayload
}