import {ObjectType, Field} from 'type-graphql'
import {prop, getModelForClass} from '@typegoose/typegoose'

@ObjectType()
export class Category {
    @Field(() => String)
    _id!: string;
    
    @Field(() => String)
    @prop({ type: () => String, required: true, unique: true })
    public name!: String;
}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true }})
