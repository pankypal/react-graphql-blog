import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { BlogContext } from "../../types";
import { FieldError } from "../models/fieldError";
import { Post, PostModel, postInput } from "../models/post";

@ObjectType()
class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() ctx: BlogContext): Promise<Post[]> {
    try {
      return PostModel.find();
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  @Query(() => PostResponse, { nullable: true })
  async post(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<PostResponse> {
    let message = "Post not found";
    let post = null;
    try {
      post = await PostModel.findById(id);
    } catch (err) {
      console.log(err);
      message = "Bad Request - Post not found";
    }

    if (!post) {
      return {
        errors: [
          {
            field: "id",
            message: message,
          },
        ],
      };
    }

    return { post };
  }

  @Mutation(() => PostResponse)
  async createPost(
    @Arg("input", () => postInput) input: postInput,
    @Ctx() ctx: BlogContext
  ): Promise<PostResponse> {
    try {
      const post = await PostModel.create({ ...input });
      return { post };
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: "",
            message: "Bad Request",
          },
        ],
      };
    }
  }

  @Mutation(() => PostResponse)
  async updatePost(
    @Arg("id", () => String) id: String,
    @Arg("input", () => postInput) input: postInput,
    @Ctx() ctx: BlogContext
  ): Promise<PostResponse> {
    let post = null;
    let errormessage = "Post not found";
    try {
      post = await PostModel.findByIdAndUpdate(
        id,
        { ...input },
        { new: true, runValidators: true }
      );
    } catch (err) {
      errormessage = "Bad Request " + errormessage;
    }

    if (!post) {
      return {
        errors: [
          {
            field: "id",
            message: errormessage,
          },
        ],
      };
    }

    return {
      post,
    };
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<Boolean> {
    try {
      await PostModel.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
