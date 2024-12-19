import { getEnvConfig } from "../../utils/index";
import { environmentValues, environmentKeys } from "../constant";

type Keys = (typeof environmentKeys)[number];

const env = environmentValues.reduce((acc, curr, index) => {
  acc[environmentKeys[index]] = getEnvConfig(curr);
  return acc;
}, {} as Record<Keys, string>);

export { env };
