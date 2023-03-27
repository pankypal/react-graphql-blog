import {ObjectType, Field, InputType} from 'type-graphql'
import {prop, getModelForClass} from '@typegoose/typegoose'

@ObjectType()
export class User {
    @Field(() => String)
    _id!: string;
    
    @Field(() => String)
    @prop({ type: () => String, required: true, unique: true, minlength: 3 })
    public username!: String;

    @Field(() => String)
    @prop({ type: () => String, required: true })
    public email!: String;

    @prop({ type: () => String, required: true, minlength: 6 })
    public password!: String;
    
    @Field(() => String)
    @prop({ type: () => String, required: true })
    public photo!: String;
}

@InputType()
export class loginInput {
    @Field(() => String)
    username!: String;
    
    @Field(() => String)
    password!: String;
}

@InputType()
export class registerInput {
    @Field(() => String)
    username!: String;
    
    @Field(() => String)
    email!: String;
    
    @Field(() => String)
    password!: String;
    
    @Field(() => String)
    photo!: String;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }})
