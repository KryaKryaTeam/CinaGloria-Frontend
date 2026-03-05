import User from "@/core/domain/entity/User";
import Password from "@/core/domain/value-object/Password";
import Email from "@/core/domain/value-object/Email";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import { inject, injectable } from "inversify";
@injectable()
export default class AuthService {
    @inject(JWTChangeRequest)
    private jwtChangeRequest!: JWTChangeRequest;

    async login(email: Email, password: Password): User {
        const result = await this.jwtChangeRequest.execute({email, password})
        
        if (result) {
            // here need logic of set up additional info
        }

        
    }
    refresh(){

    }
    private async getMe(): Promise<User> { 
        
    }
}