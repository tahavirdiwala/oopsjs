import { Body, Get, JsonController, Post, Req, Res } from "routing-controllers";
import { Response } from "express";
import { ApiResponser } from "../../services/responser/response-handlers";
import { OrderService } from "../../services/order/order.service";

@JsonController("/orders")
export class UserController {
  constructor(
    private orderService: OrderService,
    private handler: ApiResponser
  ) {}

  @Post("/")
  async add(@Body() payload: any, @Res() res: Response) {
    const data = await this.orderService.addOrder(payload);
    return this.handler.responser(res, data);
  }
}
