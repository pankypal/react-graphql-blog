import {ObjectType, Field, InputType} from 'type-graphql'
import {prop, getModelForClass} from '@typegoose/typegoose'

@ObjectType()
export class Post {
    @Field(() => String)
    _id!: string;

    @Field(() => String)
    @prop({ type: () => String, required: true, unique: true, minlength: 5 })
    public title!: String;

    @Field(() => String)
    @prop({ type: () => String, required: true, minlength: 10 })
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
export class postInput {
    @Field(() => String)
    title!: String;
    
    @Field(() => String)
    desc!: String;
    
    @Field(() => String)
    username!: String;
    
    @Field(() => String)
    photo!: String;
    
    @Field(() => String)
    categories!: String;
}

export const PostModel = getModelForClass(Post, { schemaOptions: { timestamps: true }})
