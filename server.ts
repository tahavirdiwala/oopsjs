import "reflect-metadata";
import { bootstrapMicroframework } from "microframework-w3tec";
import { iocLoader } from "./loaders/ioc.loader";
import mongoConnect from "./loaders/database.loader";
import { expressLoader } from "./loaders/express.loader";

bootstrapMicroframework({
  loaders: [iocLoader, expressLoader],
})
  .then(() => {
    mongoConnect();
  })
  .catch(console.log);
