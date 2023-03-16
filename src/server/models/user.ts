import {ObjectType, Field, InputType} from 'type-graphql'
import {prop, getModelForClass} from '@typegoose/typegoose'
import { IsEmail, MinLength } from "class-validator";

@ObjectType()
export class User {
    @Field(() => String)
    _id!: string;
    
    @Field(() => String)
    @prop({ type: () => String, required: true, unique: true })
    public username!: String;

    @Field(() => String)
    @prop({ type: () => String, required: true })
    public email!: String;

    @prop({ type: () => String, required: true })
    public password!: String;
    
    @Field(() => String)
    @prop({ type: () => String, required: true })
    public photo!: String;
}

@InputType()
export class loginInput {
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    @Field(() => String)
    username!: String;
    
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @Field(() => String)
    password!: String;
}

@InputType()
export class registerInput {
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    @Field(() => String)
    username!: String;
    
    @IsEmail({}, { message: "Invalid email" })
    @Field(() => String)
    email!: String;
    
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @Field(() => String)
    password!: String;
    
    @Field(() => String)
    photo!: String;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }})
