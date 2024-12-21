import utilityDecorators from "../../utils";
import { envValues, envKeys } from "../constant";

type Keys = (typeof envKeys)[number];

const env = Object.freeze(
  envValues.reduce((acc, curr, index) => {
    acc[envKeys[index]] = utilityDecorators.getEnvConfig(curr);
    return acc;
  }, {} as Record<Keys, string>)
);

export { env };
