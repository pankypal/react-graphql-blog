import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BlogContext } from "../../types";
import { User, UserModel, loginInput, registerInput } from "../models/user";
import bcrypt from "bcrypt";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() ctx: BlogContext): Promise<User[]> {
    return UserModel.find();
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<User | null> {
    return UserModel.findById(id);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => String) id: String,
    @Arg("input", () => registerInput) input: registerInput,
    @Ctx() ctx: BlogContext
  ): Promise<User | null> {
    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...input },
      { new: true }
    );
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<Boolean> {
    await UserModel.findByIdAndDelete(id);
    return true;
  }

  @Mutation(() => User)
  async register(
    @Arg("input", () => registerInput) input: registerInput,
    @Ctx() ctx: BlogContext
  ): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);
    const user = await UserModel.create({ ...input });
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("input", () => loginInput) input: loginInput,
    @Ctx() ctx: BlogContext
  ): Promise<User | null> {
    const user = await UserModel.findOne({ username: input.username });

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(input.password, user.password);
    if (!validPassword) {
      return null;
    }

    return user;
  }
}
