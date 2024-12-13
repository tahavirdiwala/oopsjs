import { getEnvConfig } from "../../utils/index";
import { EnvironmentValues, EnvironmentKeys } from "../constant";

type Keys = (typeof EnvironmentKeys)[number];

const env = EnvironmentValues.reduce(
  (acc, curr, index) => ({
    ...acc,
    [EnvironmentKeys[index]]: getEnvConfig(curr),
  }),
  {} as Record<Keys, any>
);

export { env };
