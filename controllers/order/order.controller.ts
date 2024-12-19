import { Body, JsonController, Post, Res } from "routing-controllers";
import { Response } from "express";
import { ApiResponser } from "../../services/responser/response-handlers";
import { OrderService } from "../../services/order/order.service";
import { TOrder } from "../../types/order";

@JsonController("/orders")
export class UserController {
  constructor(
    private orderService: OrderService,
    private handler: ApiResponser
  ) {}

  @Post("/")
  async add(@Body() payload: TOrder, @Res() res: Response) {
    const data = await this.orderService.addOrder(payload);
    return this.handler.responser(res, data);
  }
}
