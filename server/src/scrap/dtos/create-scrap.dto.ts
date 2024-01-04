import {IsInt , MaxLength , MinLength , IsOptional} from 'class-validator';



export class CreateScrapDto{
    @IsOptional()
    @IsInt()
    creatorId: number;
    
    
    @IsInt()
    ownerId: number;

    
    @MinLength(4, {message: "A mensagem precisa ter pelo menos 4 caracteres"})
    @MaxLength(256, {message: "A mensagem precisa ter no maximo 256 caracteres"})
    message: string;
}