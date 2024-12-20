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

  async createBulkOrders(payload: TOrder[]) {
    try {
      const orders = await Order.insertMany(payload);
      return this.handler.sendResponse(
        "Bulk orders created successfully",
        StatusCodes.CREATED,
        orders
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async updateBulkOrders(payload: TOrder[]) {
    try {
      const updateBulkOrders = payload.map(({ _id, ...item }) => ({
        updateOne: {
          filter: { _id: _id },
          update: { $set: item },
          upsert: false,
        },
      }));

      await Order.bulkWrite(updateBulkOrders);

      return this.handler.sendResponse(
        "Bulk orders updated successfully",
        StatusCodes.OK
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async deleteBulkOrders(ids: string[]) {
    try {
      await Order.deleteMany({ _id: { $in: ids } });

      return this.handler.sendResponse(
        "Bulk orders deleted successfully",
        StatusCodes.OK
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
