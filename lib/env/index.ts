import utilityDecorators from "../../utils";
import { environmentValues, environmentKeys } from "../constant";

type Keys = (typeof environmentKeys)[number];

const env = environmentValues.reduce((acc, curr, index) => {
  acc[environmentKeys[index]] = utilityDecorators.getEnvConfig(curr);
  return acc;
}, {} as Record<Keys, string>);

export { env };
