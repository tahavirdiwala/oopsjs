import {
  Body,
  Delete,
  JsonController,
  Post,
  Put,
  Res,
} from "routing-controllers";
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

  @Post("/bulk")
  async createBulkOrders(@Body() payload: TOrder[], @Res() res: Response) {
    const data = await this.orderService.createBulkOrders(payload);
    return this.handler.responser(res, data);
  }

  @Put("/bulk")
  async updateBulkOrders(@Body() payload: TOrder[], @Res() res: Response) {
    const data = await this.orderService.updateBulkOrders(payload);
    return this.handler.responser(res, data);
  }

  @Delete("/bulk")
  async deleteBulkOrders(@Body() ids: string[], @Res() res: Response) {
    const data = await this.orderService.deleteBulkOrders(ids);
    return this.handler.responser(res, data);
  }
}
