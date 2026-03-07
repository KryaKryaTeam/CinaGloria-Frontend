import User from "@/core/domain/entity/User";
import Password from "@/core/domain/value-object/Password";
import Email from "@/core/domain/value-object/Email";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import { inject, injectable } from "inversify";
import RequestMe from "@/core/network/requests/RequestMe";
import { Token } from "@/core/network/requests/type";
@injectable()
export default class AuthService {
    @inject(JWTChangeRequest)
    private jwtChangeRequest!: JWTChangeRequest;
    @inject(RequestMe)
    private requestMe!: RequestMe;
    @inject(UserState)
    private readonly userState: UserState;

    async login(email: Email, password: Password): Promise<User> {
        try {
            const result = await this.jwtChangeRequest.execute({email, password})
            if (result) {
                const me = await this.getMe(result.accessToken);
                return me;
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            throw new Error(`Failed to login, ${error}`);
        }
    }

    private async getMe(token: Token): Promise<User> {
        try {
            const me = await this.requestMe.execute(token);
            return me; 
        } catch (error) {  
            throw new Error("Failed to fetch user data");
        }
    }

    async logout(){}

    getAuthorizationToken(): string {
        return this.userState.getAuth
    }
    setAuthorizationToken(token: string): void {}
}