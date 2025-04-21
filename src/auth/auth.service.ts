import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor( 
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) {}

    async signup(signupData: SignupDto): Promise<{ token: string }> {

        const { name, email, password } = signupData

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await this.userModel.create({ name, email, password: hashedPassword })

        const token = this.jwtService.sign({ id: newUser })
        return { token }
    }

    async login(loginData: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginData

        const user = await this.userModel.findOne({ email })
        
        if (!user) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({ id: user._id })
        return { token }
    }

}
