import { Service } from "typedi";
import { StatusCodes } from "../../lib/constant";
import { ResponseHandlers } from "../responser/response-handlers";
import Order from "../../models/order.model";
import { TOrder } from "../../types/order/order";
import { ResponseMessages } from "../../lib/constant/messages";

@Service()
export class OrderService {
  constructor(private handler: ResponseHandlers) {}
  private messages = ResponseMessages.order;

  async addOrder(payload: TOrder) {
    try {
      const order = await Order.create(payload);
      return this.handler.sendResponse(
        this.messages.add,
        StatusCodes.CREATED,
        order
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async getAllOrders() {
    try {
      const orders = await Order.find();
      return this.handler.sendResponse(
        this.messages.getAll,
        StatusCodes.OK,
        orders
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async getOrder(_id: string) {
    try {
      const order = await Order.findOne({ _id });

      return this.handler.sendResponse(
        this.messages.get,
        StatusCodes.OK,
        order
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async editOrder(_id: string, payload: TOrder) {
    try {
      await Order.findOneAndUpdate({ _id }, payload);

      return this.handler.sendResponse(this.messages.edit);
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async deleteOrder(_id: string) {
    try {
      await Order.findOneAndDelete({ _id });

      return this.handler.sendResponse(this.messages.delete);
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async createBulkOrders(payload: TOrder[]) {
    try {
      const orders = await Order.insertMany(payload);
      return this.handler.sendResponse(
        this.messages.addBulk,
        StatusCodes.CREATED,
        orders
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async updateBulkOrders(payload: TOrder[]) {
    try {
      const operations = payload.map(({ _id, ...item }) => ({
        updateOne: {
          filter: { _id },
          update: { $set: item },
          upsert: false,
        },
      }));

      await Order.bulkWrite(operations);

      return this.handler.sendResponse(
        this.messages.updateBulk,
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
        this.messages.deleteBulk,
        StatusCodes.OK
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
