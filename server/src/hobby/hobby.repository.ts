import { CreateHobbyDto } from "./dtos/create-hobby.dto";
import { UpdateHobbyDto } from "./dtos/update-hobby.dto";
import { mongodb , Collection , ObjectId } from "../mongodb";
import type { Hobby } from "./hobby.types";

export class HobbyRepository {

constructor(){
    this.hobbies = mongodb.collection("hobbies");
}

    hobbies : Collection<Hobby>;

    async readHobby(id: string){
        const hobby = await this.hobbies.findOne({
          _id: new ObjectId(id),  
        });
        this.prepareJsonEncode(hobby);
        return hobby;
    }

    async listOwnerHobbies(ownerId : number){
        const hobbies = await this.hobbies.find({
            ownerId,  
          });

          const hobbiesArray = await hobbies.toArray();
          for (let index = 0; index < hobbiesArray.length; index++) {
            this.prepareJsonEncode(hobbiesArray[index]);
          }
          return hobbies;

    }

    async createHobby(createHobbyDto : CreateHobbyDto){
        const results = await this.hobbies.insertOne(createHobbyDto);
        const hobby = await this.hobbies.findOne({
            _id: results.insertedId,   
        });
        this.prepareJsonEncode(hobby);
        return hobby;
    }    

    async updateHobby(id:string , updateHobbyDto : UpdateHobbyDto){
        const hobby = await this.hobbies.findOneAndUpdate({
          _id: new ObjectId(id)
        },
          {
            $set: updateHobbyDto,
          },
          {
            returnDocument: "after",
          })
        

        this.prepareJsonEncode(hobby);
        return hobby;
};

    async deleteHobby(id: string){
        const hobby = await this.hobbies.findOneAndDelete({
            _id: new ObjectId(id)    
        });
        this.prepareJsonEncode(hobby);
        return hobby;
    }



private prepareJsonEncode(hobby: any) {
   hobby.id = hobby._id.toString();
}


}