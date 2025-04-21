import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class User {

    @Prop()
    name: string

    @Prop({ unique: true })
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)