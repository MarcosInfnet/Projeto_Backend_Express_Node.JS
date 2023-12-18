import { JsonController , Post , Body , Get ,Authorized , CurrentUser} from "routing-controllers";
import { SingInDto } from "./dto/sing-in.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dtos/create-user.dto";
import type { User } from "../user/user.types";

@JsonController("/auth")
export class AuthController{
    constructor(){
        this.authService = new AuthService();
    }
        authService : AuthService;

    @Post("/sing-in")
    async singIn(@Body() singInDto : SingInDto){
        const response = await this.authService.singIn(singInDto);
        return response;
    }
    @Post("/sing-up")
    async singUp(@Body() createUserDto : CreateUserDto){
        const response = await this.authService.singUp(createUserDto);
        return response;
    }

    @Authorized()
    @Get("/session")
    async session(@CurrentUser() user: User){
        return user;

    }

}