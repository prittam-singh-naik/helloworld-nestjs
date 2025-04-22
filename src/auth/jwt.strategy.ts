import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./schemas/user.schema";
import mongoose from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret
        })
    }

    async validate(payload: any): Promise<User> {
        const { id } = payload

        const user = await this.userModel.findById(id)

        if (!user) throw new UnauthorizedException('Login first to access this endpoint.')

        return user
    }

}