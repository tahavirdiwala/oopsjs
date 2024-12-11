import { getEnvConfig } from "../../utils/index";
import { EnvironmentValues, EnvironmentKeys } from "../constant";

const EnvironmentMapper = EnvironmentValues.reduce(
    (acc, curr, index) => ({
        ...acc,
        [EnvironmentKeys[index]]: getEnvConfig(curr),
    }),
    {} as Record<"MongoUri" | "Port", string>
);

export { EnvironmentMapper }
