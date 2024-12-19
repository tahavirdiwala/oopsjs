enum StatusCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNSUPPORTED_MEDIA_TYPE = 415,
  UNPROCESSABLE_REQUEST = 422,
  RESOURCE_LOCKED = 423,
  INTERNAL_SERVER_ERROR = 500,
}

enum PassWordConfig {
  Range = 10,
}

enum JwtConfig {
  MaxAge = 12 * 60 * 60 * 1000,
}

const envKeys = [
  "MongoUri",
  "Port",
  "RoutePrefix",
  "Controllers",
  "Middlewares",
  "JwtExpiry",
  "JwtSecret",
  "JwtPasswordExpiry",
  "Email",
  "Password",
  "ClientUrl",
] as const;

const envValues = [
  "MONGO_URL",
  "PORT",
  "PREFIX",
  "Controllers",
  "Middlewares",
  "JWT_EXPIRE",
  "JWT_SECRET",
  "JWT_PASSWORD_RESET_EXPIRE",
  "EMAIL",
  "PASSWORD",
  "CLIENT_URL",
];

export { StatusCodes, PassWordConfig, JwtConfig, envKeys, envValues };
