import { Schema } from "mongoose";

type TOrder = {
  name: string;
  description: Schema.Types.Mixed;
};

export { TOrder };
