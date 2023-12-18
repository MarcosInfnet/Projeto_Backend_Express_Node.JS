import { IsString , IsEmail , MinLength , IsOptional} from "class-validator";

export class CreateUserDto {

  @IsString()
  @MinLength(2, {message:"O nome precisa ter no minimo duas letras!",})
  first_name:string;

  
  @MinLength(2, {message:"O sobrenome precisa ter no minimo duas letras!",})
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()  
  avatar: string;

  @IsString()
  @MinLength(6, {message:"A senha precisa ter no minimo 6 caracteres!",})
  password: string;

  @IsEmail(undefined,{message:"O email é invalido!",})
  email: string;

}
