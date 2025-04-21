import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import mongoose from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class AuthService {

    constructor( 
        // @Injectable(User.name)
        private userModel: mongoose.Model<User>
    ) {}

    async signup(signupData: SignupDto): Promise<{ token: string }> {

        const { name, email, password } = signupData

        const newUser = await this.userModel.create({ name, email, password })

        

        const token = '123'
        return { token }
    }

}
