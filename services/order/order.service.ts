import { Service } from "typedi";
import { StatusCodes } from "../../lib/constant";
import { ResponseHandlers } from "../responser/response-handlers";
import Order from "../../models/order.model";
import { TOrder } from "../../types/order";

@Service()
export class OrderService {
  constructor(private handler: ResponseHandlers) {}

  async addOrder(payload: TOrder) {
    try {
      const order = await Order.create(payload);
      return this.handler.sendResponse(
        "Order created successfully",
        StatusCodes.CREATED,
        order
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
