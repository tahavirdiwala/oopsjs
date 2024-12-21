import { Model } from "mongoose";

type TStatic<T, U> = Model<T> & {
  findBy(field: Partial<T>): Promise<U>;
};

export { TStatic };
