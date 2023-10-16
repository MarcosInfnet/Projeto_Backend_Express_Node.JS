import * as userService from "../user/user.service.mjs";


const defaultLimit = 50;
const minFriendsCount = 12;
const friendsRange = 15;


async function seedFriend() {
    const limit = Number(process.argv[2] || defaultLimit); 
    console.log("iniciando seeding...");
    console.log(`Vão ser criados ${limit} usuarios`);
    const users = await userService.listUsers();
    console.log("seeding em andamento...");
    const usersId = users.map ((user) => user.id);
    let friendships = [];


    for (const id of usersId) {
        const friendsCount = minFriendsCount + Math.round(Math.random() * friendsRange);

    for (let index = 0; index < friendsCount; index++) {
    let randomId;
        
    do{ randomId = usersId[Math.floor(Math.random()*usersId.length)];


    } while(randomId === id ||
            friendships.some(
            (friend) =>
            (friend.userA === id && friend.userB === randomId) ||
            (friend.userA === randomId && friend.userB === id)
            ));

            friendships.push({
                userA: id,
                userB: randomId,
            });
    }
  }
  for (const friendship of friendships) {
    await userService.addFriend(friendship.userA, friendship.userB);
    console.log(`Usuário #${friendship.userA} adicionou #${friendship.userB}`);
  }
  console.log("Seeding realizado com sucesso!");
}

seedFriend();