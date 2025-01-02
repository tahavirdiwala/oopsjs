interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

type TDbType = "mongodb" | "sql";

export { IDatabaseConnection, TDbType };
