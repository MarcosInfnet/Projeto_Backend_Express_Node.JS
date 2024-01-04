import { HobbyRepository } from "./hobby.repository";
import { CreateHobbyDto } from "./dtos/create-hobby.dto";
import { UpdateHobbyDto } from "./dtos/update-hobby.dto";
import { Service } from "typedi";
import { UserRepository } from "../user/user.repository";
import { ForbiddenError} from "routing-controllers";



@Service()
export class HobbyService {
    constructor(){
       this.hobbyRepository = new HobbyRepository();
       this.userRepository = new UserRepository();
    }

    hobbyRepository : HobbyRepository;
    userRepository : UserRepository;


    async readHobby(id: string) {
    const hobby = this.hobbyRepository.readHobby(id);
    return hobby;
    }

    async listOwnerHobbies(ownerId: number) {
        const hobbies = await this.hobbyRepository.listOwnerHobbies(ownerId);
        return hobbies;
      }

      async createHobby(createHobbyDto: CreateHobbyDto) {
        const isOwner = await this.userRepository.readUser(createHobbyDto.ownerId);

        if(!isOwner){
            throw new ForbiddenError('Voce precisa ser o dono da pagina para criar hobby!');
        }

        const hobby = await this.hobbyRepository.createHobby(createHobbyDto);
        return hobby;
        }

        async updateHobby(id: string, updateHobbyDto: UpdateHobbyDto) {
         const hobby = await this.hobbyRepository.readHobby(id);

         if(hobby?.ownerId !== updateHobbyDto.ownerId){
            throw new ForbiddenError("Voce precisa ser o dono da pagina para atualizar o hobby!")
         }

         const updatedHobby = await this.hobbyRepository.updateHobby(
              id,
              updateHobbyDto
            );
            return updatedHobby;
          }

          async deleteHobby(id: string, userId: number) {
            const hobby = await this.hobbyRepository.readHobby(id);

            if (hobby?.ownerId !== userId) {
                throw new ForbiddenError("Você precisa ser o dono da pagina para deleta-lo!");
              }

            const deletedHobby = await this.hobbyRepository.deleteHobby(id);
            return deletedHobby;
          }

}