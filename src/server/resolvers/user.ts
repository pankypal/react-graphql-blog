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
import { User, UserModel, loginInput, registerInput } from "../models/user";
import { FieldError } from "../models/fieldError";
import bcrypt from "bcrypt";

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() ctx: BlogContext): Promise<User[]> {
    try {
      return UserModel.find();
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  @Query(() => UserResponse, { nullable: true })
  async user(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<UserResponse | null> {
    let message = "User not found";
    let user = null;

    try {
      user = await UserModel.findById(id);
    } catch (err) {
      console.log(err);
      message = "Bad Request - User not found";
    }

    if (!user) {
      return {
        errors: [
          {
            field: "id",
            message: message,
          },
        ],
      };
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async updateUser(
    @Arg("id", () => String) id: String,
    @Arg("input", () => registerInput) input: registerInput,
    @Ctx() ctx: BlogContext
  ): Promise<UserResponse | null> {
    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);

    let user = null;
    let errormessage = "User not found";
    try {
      user = await UserModel.findByIdAndUpdate(id, { ...input }, { new: true });
    } catch (err) {
      console.log(err);
      errormessage = "Bad Request " + errormessage;
    }

    if (!user) {
      return {
        errors: [
          {
            field: "id",
            message: errormessage,
          },
        ],
      };
    }

    return { user };
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id", () => String) id: String,
    @Ctx() ctx: BlogContext
  ): Promise<Boolean> {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input", () => registerInput) input: registerInput,
    @Ctx() ctx: BlogContext
  ): Promise<UserResponse> {
    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);

    try {
      const user = await UserModel.create({ ...input });
      return { user };
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: "username",
            message: "Bad request",
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input", () => loginInput) input: loginInput,
    @Ctx() ctx: BlogContext
  ): Promise<UserResponse> {
    try {
      const user = await UserModel.findOne({ username: input.username });

      if (!user) {
        return {
          errors: [
            {
              field: "",
              message: "User not found",
            },
          ],
        };
      }

      const validPassword = await bcrypt.compare(input.password, user.password);
      if (!validPassword) {
        return {
          errors: [
            {
              field: "",
              message: "Invalid credentials",
            },
          ],
        };
      }

      return { user };
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: "",
            message: "Invalid credentials",
          },
        ],
      };
    }
  }
}
