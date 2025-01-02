import mongoose from "mongoose";
import { env } from "../lib/env";
import {
  IDatabaseConnection,
  TDbType,
} from "../types/db-connection/db-connector";

// export default () => {
//   const mongoConnect = () => {
//     mongoose
//       .connect(`${env.MongoUri}`)
//       .then(() => {
//         return console.info(`Successfully connected to DB `);
//       })
//       .catch((error) => {
//         console.log(error);
//         return process.exit(1);
//       });
//   };
//   mongoConnect();
//   mongoose.connection.on("disconnected", mongoConnect);
// };

class MongoDbConnector implements IDatabaseConnection {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(`${env.MongoUri}`);
      console.info("Successfully connected to MongoDB");
    } catch (error) {
      console.log(error);
      return process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

class SqlConnector implements IDatabaseConnection {
  async connect(): Promise<void> {
    try {
      console.info("Successfully connected to SQL database");
    } catch (error) {
      console.error("SQL connection error:", error);
      process.exit(1);
    }
  }
  async disconnect(): Promise<void> {}
}

class DatabaseFactory {
  static createConnection(type: TDbType) {
    switch (type) {
      case "mongodb":
        return new MongoDbConnector();
      case "sql":
        return new SqlConnector();
      default:
        throw new Error("No such database type exist");
    }
  }
}

export default () => {
  const dbType = env.DatabaseType as TDbType;

  const connector = DatabaseFactory.createConnection(dbType);

  connector.connect();

  if (dbType === "mongodb") {
    mongoose.connection.on("disconnected", async () => {
      await connector.connect();
    });
  }
};
