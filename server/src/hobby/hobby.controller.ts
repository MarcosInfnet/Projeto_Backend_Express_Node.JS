import { JsonController , Get , Post , Put , Delete , Param , Authorized , CurrentUser , Body} from "routing-controllers";
import type { User } from "../user/user.types";
import { CreateHobbyDto } from "./dtos/create-hobby.dto";
import { UpdateHobbyDto } from "./dtos/update-hobby.dto";
import { HobbyService } from "./hobby.service";
import { Service } from "typedi";


@Service()
@JsonController("/hobbies")
export class HobbyController {

    constructor(){

        this.hobbyService = new HobbyService();
    }

    hobbyService : HobbyService;

    @Authorized()
    @Get("/owner/:ownerId")    
    async listOwnerHobbies(@Param("ownerId") ownerId : number , 
                          @CurrentUser() user : User) {

    const hobbies = await this.hobbyService.listOwnerHobbies(ownerId);
    return hobbies;                     
}

    
    @Authorized()
    @Get("/:hobbyId")    
    async readHobby(@Param("hobbyId") hobbyId: string){
        const hobby = await this.hobbyService.readHobby(hobbyId);
        return hobby;
    }

    @Authorized()
    @Post() 
    async createHobby(@Body() createHobbyDto : CreateHobbyDto , @CurrentUser() user : User){
        createHobbyDto.ownerId = user.id;
        const hobby = await this.hobbyService.createHobby(createHobbyDto);
        return hobby;

    }

    @Authorized()
    @Put("/:hobbyId") 
    async updateHobby(@Param("hobbyId") hobbyId:string , @Body() updateHobbyDto : UpdateHobbyDto , @CurrentUser() user : User){
        updateHobbyDto.ownerId = user.id;
        const hobby = await this.hobbyService.updateHobby(hobbyId ,updateHobbyDto );
        return hobby;

    }

    @Authorized()
    @Delete("/:hobbyId")    
    async deleteHobby(@Param("hobbyId") hobbyId: string , @CurrentUser() user:User){
        const hobby = await this.hobbyService.deleteHobby(hobbyId , user.id);
        return hobby;


    }

}