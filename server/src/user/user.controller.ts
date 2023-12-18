import {JsonController , Get , Post, Param , Body , Authorized , CurrentUser , UploadedFile, Patch } from "routing-controllers";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserService } from "./user.service";
import { User } from "./user.types"
import { UpdateUserDto } from "./dtos/update-user.dto";

@JsonController("/users")
export class UserController{
constructor(){
this.userRepository = new UserRepository();
this.userService = new UserService();
}

userRepository : UserRepository;
userService : UserService;

@Post()
async createUser(@Body() body : CreateUserDto){
    const user = await this.userRepository.createUser(body);
    return user;

}

@Get("/:userId")
async getById(@Param ("userId") userId : number){
const user = await this.userRepository.readUser(userId);
return user;
}

@Get("/:userId/friends")
async listFriends(@Param("userId") userId : number){
    const friends = await this.userRepository.listFriends(userId)
    return friends;
}

@Authorized()
@Post ("/avatar")
async uploadAvatar(@UploadedFile("avatar") avatar : Express.Multer.File , 
@CurrentUser() user : User){
    const response = await this.userService.uploadAvatar(user.id , avatar);
    return response;
}


@Authorized()
@Patch("/update-myself")
async updateMyself(@CurrentUser() user : User , @Body() updateUserDto : UpdateUserDto){
    const nextUser = await this.userRepository.updateUser(user.id , updateUserDto);
    return nextUser;

}

@Authorized()
@Post("/add-friend/:friendId")
async addFriend(
  @Param("friendId") friendId: number,
  @CurrentUser() user: User
) {
  const friend = await this.userService.addFriend(user.id, friendId);
  return friend;
}

@Authorized()
@Post("/remove-friend/:friendId")
async removeFriend(
  @Param("friendId") friendId: number,
  @CurrentUser() user: User
) {
  const friend = await this.userService.removeFriend(user.id, friendId);
  return friend;
}

@Authorized()
@Get("/check-is-friend/:friendId")
async checkIsFriend(
  @Param("friendId") friendId: number,
  @CurrentUser() user: User
) {
  const isFriend = await this.userRepository.checkIsFriend(user.id, friendId);
  return { isFriend };
}

}






