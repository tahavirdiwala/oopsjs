import { getEnvConfig } from "../../utils/index";
import { EnvironmentValues, EnvironmentKeys } from "../constant";

const env = EnvironmentValues.reduce(
  (acc, curr, index) => ({
    ...acc,
    [EnvironmentKeys[index]]: getEnvConfig(curr),
  }),
  {} as Record<
    "MongoUri" | "Port" | "RoutePrefix",
    any
  >
);

export { env };
