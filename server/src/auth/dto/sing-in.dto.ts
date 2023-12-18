import {IsEmail , IsString} from "class-validator";


export class SingInDto{
    @IsEmail(undefined , {
        message: "Este email não é valido!"
    })
    email: string;

    @IsString({
        message: "A senha está incorreta!"
    })
    password: string;
}