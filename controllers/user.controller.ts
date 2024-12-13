import { Body, Get, JsonController, Post, Res } from "routing-controllers";
import { UserService } from "../services/user.service";
import { TUser } from "../types/user";
import { Response } from "express";
import { ResponseHandlers } from "../common/common";
import { StatusCodes } from "../lib/constant";

@JsonController("/users")
export class UserController {
  constructor(
    private userService: UserService,
    private responser: ResponseHandlers
  ) {}

  @Post("/")
  async create(@Body() user: TUser, @Res() res: Response) {
    try {
      const data = await this.userService.createUser(user);
      return this.responser.sendResponse(
        res,
        StatusCodes.CREATED,
        "User created successfully",
        data
      );
    } catch (error) {
      return this.responser.sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        error as Error
      );
    }
  }

  @Get("/")
  async getAll(@Res() res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return this.responser.sendResponse(
        res,
        StatusCodes.OK,
        "Users fetched successfully",
        users
      );
    } catch (error) {
      return this.responser.sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        error as Error
      );
    }
  }
}
