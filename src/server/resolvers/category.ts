import {Arg, Ctx, Query, Resolver, Mutation} from "type-graphql";
import { BlogContext } from "../../types";
import {Category, CategoryModel} from "../models/category";

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    async categories(@Ctx() ctx: BlogContext): Promise<Category[]> {
        try {
            return CategoryModel.find();
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    @Mutation(() => Category, {nullable: true})
    async createCategory(
        @Arg("name", () => String) name: String,
        @Ctx() ctx: BlogContext
    ): Promise<Category | null> {
        try {
            const category = await CategoryModel.create({name});
            return category;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}