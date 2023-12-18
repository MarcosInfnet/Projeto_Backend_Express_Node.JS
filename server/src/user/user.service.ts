import { UserRepository } from "./user.repository";
import fs from 'fs/promises'
import sharp from "sharp";
import { BadRequestError } from "routing-controllers";


export class UserService{

    constructor(){
        this.userRepository = new UserRepository;
        
    }

    userRepository : UserRepository;

async addFriend(userA : number , userB : number){
    const isFriend = await this.userRepository.checkIsFriend(userA , userB)

    if(isFriend){
        throw new BadRequestError("Usuario já adicionado como amigo!");
        }

    const friend = await this.userRepository.addFriend(userA , userB);
    return friend;
}


async removeFriend(userA : number , userB : number) {
    const isFriend = await this.userRepository.checkIsFriend(userA, userB);

    if (!isFriend) {
      throw new BadRequestError("Usuario não adicionado");
    }

    const friend = await this.userRepository.removeFriend(userA, userB);
    return friend;
  }




async uploadAvatar(userId:number , avatar: Express.Multer.File){
    const avatarBuffer = await sharp(avatar.buffer).resize({
        width: 256,
        height: 256,
        fit: 'cover',
        position: 'center',
    }).toBuffer();

    await fs.writeFile(`public/${userId}.jpg` , avatarBuffer);
    const avatarPath = `http://localhost:${process.env.PORT}/public/${userId}.jpg`;
    const user = await this.userRepository.updateAvatar(userId , avatarPath);
    return user;
  }
}