import { Arg, Ctx, InputType, Mutation, Query, Resolver } from "type-graphql";
import { BlogContext } from "../../types";
import {
  Post,
  PostModel,
  updatePostInput,
  createPostInput,
} from "../models/post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() ctx: BlogContext): Promise<Post[]> {
    return PostModel.find();
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<Post | null> {
    return PostModel.findById(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("input", () => createPostInput) input: createPostInput,
    @Ctx() ctx: BlogContext
  ): Promise<Post> {
    const post = await PostModel.create({ ...input });
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => String) id: String,
    @Arg("input", () => updatePostInput) input: updatePostInput,
    @Ctx() ctx: BlogContext
  ): Promise<Post | null> {
    const post = await PostModel.findByIdAndUpdate(
      id,
      {...input},
      { new: true }
    );
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<Boolean> {
    await PostModel.findByIdAndDelete(id);
    return true;
  }
}
