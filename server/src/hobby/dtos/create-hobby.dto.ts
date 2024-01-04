import {IsInt , MinLength , MaxLength} from "class-validator"

export class CreateHobbyDto {

   @IsInt()
   ownerId: number;

   @MinLength(2 , {message: "O hobby precisa ser maior"})
   @MaxLength(20 , {message: "O hobby precisa ser menor"})
   message: string;
}