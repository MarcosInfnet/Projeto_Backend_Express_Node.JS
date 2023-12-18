import { prisma } from "../prisma";
import { CreateUserDto } from "./dtos/create-user.dto";
import type { UpdateUserDto } from "./dtos/update-user.dto";
import bcrypt from 'bcrypt'

export class UserRepository{
     async createUser(data : CreateUserDto){
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password , salt);
        
        const user = await prisma.users.create({
            
        data:{
            first_name: data.first_name,
            last_name: data.last_name,
            avatar: data.avatar ??'/foto_anonimo.jpg',
            passwd: hash,
            email: data.email,
        },
    });
        return user;

        // O codigo acima são os schemas que o prisma utiliza para criar a abstração no DB. E isso é equivalente aos comandos do DB relacional abaixo.
        // const user = db.prepare(/* sql*/`insert into users (
            // first_name,
            // last_name,
            // avatar,
            // passwd 
            // ) values(?,?,?,?) returning*`)
            // .get(data.first_name, data.last_name, data.avatar, data.passwd);
            // return user;
        }
    
        async updateUser(userId: number , data : UpdateUserDto){
            // const salt = await bcrypt.genSalt(10);
            // const hash = await bcrypt.hash(data.password , salt);

       
            const user = await prisma.users.update({
            where: {
            id: userId,
            }, 
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                // passwd: hash,
                email: data.email,
            }
         });
         return user;
        }

         async readUser(id : number) {
            const user = await prisma.users.findUnique({
                where: {id: id},
            });
            return user;
            // const user = db.prepare(/* sql*/`select * from users where id=?`).get(id);
            // return user;
        }
        
        async listUsers() {
            const users = await prisma.users.findMany();
            return users;

            // const users = db.prepare(/* sql*/`select * from users`).all();
            // return users;
        }
        


        async findByEmail(email: string) {
           const user = await prisma.users.findUnique({
            where : {email,},
           });
           return user;
        }




        async addFriend(userA : number , userB : number){
            const friend = await prisma.friends.create({
                data:{
                    user_a: userA,
                    user_b: userB,
                }
            })
            return friend;


            // const friend = db.prepare(/* sql*/`insert into friends (user_a , user_b) values (? , ?) returning *`).get(userA , userB);
            // return friend;
            }
        
        async listFriends(userId : number){
            const friends = await prisma.$queryRaw /* sql*/`
             select * from users where id in (
            select user_b from friends where user_a = ${userId}
            UNION
            select user_a from friends where user_b = ${userId}
            )
            order by created_at DESC limit 9;`;
            return friends;
        
        
        
        
            // const friends = db.prepare (/* sql*/`
            // select * from users where id in (
            // select user_b from friends where user_a = ?
            // UNION
            // select user_a from friends where user_b = ?
            // )
            // order by created_at DESC limit 9;`).all(userId , userId);
            // return friends;
        }

        async updateAvatar(userId: number , avatar: string){
            const user = await prisma.users.update({
              where : {

                id: userId,
              },
              data: {
                avatar,
            },
            });
            return user;
        }

        async checkIsFriend(userA: number , userB: number){
        const maybeFriend = await prisma.friends.findFirst({
           where: {
             OR: [
                {user_a: userA, user_b: userB},
                {user_b: userA, user_a: userB},
             ], 
            },
          });
          const isFriend = maybeFriend !== null;
          return isFriend;
        }
        
        async removeFriend(userA: number, userB: number) {
            const friend = await prisma.friends.findFirst({
              where: {
                OR: [
                  {
                    user_a: userA,
                    user_b: userB,
                  },
                  {
                    user_a: userB,
                    user_b: userA,
                  },
                ],
              },
            });
              await prisma.friends.delete({
               where: {
                id: friend?.id,
               },
              })  
              return friend;
            }

}




