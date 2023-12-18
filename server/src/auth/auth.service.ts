import type { SingInDto } from "./dto/sing-in.dto";
import { UserRepository } from "../user/user.repository";
import { UnauthorizedError , BadRequestError } from "routing-controllers";
import { JwtService } from "./jwt.service";
import type { CreateUserDto } from "../user/dtos/create-user.dto";
import bcrypt from 'bcrypt'


export class AuthService {
    constructor(){
        this.userRepository = new UserRepository();
        this.jwtService = new JwtService();
    }

        userRepository : UserRepository;
        jwtService: JwtService;

    async singIn({email , password} : SingInDto){
        const maybeUser = await this.userRepository.findByEmail(email);

        if (maybeUser === null){
        throw new UnauthorizedError("Não existe usuário cadastrado com este email!");
        }

        const passwordMatches = await bcrypt.compare(password , maybeUser.passwd);


        if(!passwordMatches){
            throw new UnauthorizedError("Email ou senha invalido!");
            }
        
        const payload = {
            id: maybeUser.id,
            name: `${maybeUser.first_name} ${maybeUser.last_name}`,
            email: maybeUser.email,
        };

        const token = this.jwtService.encode(payload)

        return {user : maybeUser , token};
    }


    async singUp(createUserDto : CreateUserDto){
        const maybeUser = await this.userRepository.findByEmail(createUserDto.email);
        if(maybeUser){
            throw new BadRequestError('Email já está em utilização!');
        }
    const user = await this.userRepository.createUser(createUserDto);

    const payload = {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
    };

    const token = this.jwtService.encode(payload)

    return {user : user , token};
    }
    }
