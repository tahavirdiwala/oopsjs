import { Body, Get, JsonController, Post, Res } from "routing-controllers";
import { UserService } from "../services/user.service";
import { TUser } from "../types/user";
import { Response } from "express";
import { StatusCodes } from "../lib/constant";

@JsonController("/users")
export class UserController {
  constructor(private userService: UserService,
  ) {
  }


  @Post("/")
  async create(@Body() user: TUser, @Res() res: Response) {
    try {
      // const data = await this.userService.createUser(user);
      // return this.sendResponse(res, StatusCodes.CREATED, "User created successfully", data);
      console.log('check', this.userService);

    } catch (error) {
    }
  }

  @Get("/")
  async getAll() {
    return "hello";
  }
}
