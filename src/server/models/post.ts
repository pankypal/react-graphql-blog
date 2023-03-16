import {ObjectType, Field, InputType} from 'type-graphql'
import {prop, getModelForClass} from '@typegoose/typegoose'
import { IsNotEmpty, MinLength } from "class-validator";

@ObjectType()
export class Post {
    @Field(() => String)
    _id!: string;

    @Field(() => String)
    @prop({ type: () => String, required: true, unique: true })
    public title!: String;

    @Field(() => String)
    @prop({ type: () => String, required: true })
    public desc!: String;

    @Field(() => String)
    @prop({ type: () => String, required: true })
    public username!: String;
    
    @Field(() => String)
    @prop({ type: () => String, required: true })
    public photo!: String;

    @Field(() => String)
    @prop({ type: String, required: true })
    public categories!: String;;
}

@InputType()
export class updatePostInput {
    @MinLength(5, { message: "Title must be at least 5 characters long" })
    @Field(() => String)
    title!: String;

    @MinLength(10, { message: "Description must be at least 10 characters long" })
    @Field(() => String)
    desc!: String;
    
    @Field(() => String)
    username!: String;
    
    @Field(() => String)
    photo!: String;
    
    @IsNotEmpty()
    @Field(() => String)
    categories!: String;
}

@InputType()
export class createPostInput {
    @MinLength(5, { message: "Title must be at least 5 characters long" })
    @Field(() => String)
    title!: String;
    
    @MinLength(10, { message: "Description must be at least 10 characters long" })
    @Field(() => String)
    desc!: String;
    
    @Field(() => String)
    username!: String;
    
    @Field(() => String)
    photo!: String;
    
    @IsNotEmpty()
    @Field(() => String)
    categories!: String;
}

export const PostModel = getModelForClass(Post, { schemaOptions: { timestamps: true }})
