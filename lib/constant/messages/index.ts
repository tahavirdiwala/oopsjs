import SMTPPool from "nodemailer/lib/smtp-pool";
import { env } from "../../env";

const ResponseMessages = {
  auth: {
    register: `User register successfully`,
    login: `User login successfully`,
    logout: `User logout successfully`,
    changedPassword: `Password change successfully`,
    resetPassword: `Password reset successfully`,
    userExist: `User already exist try login`,
    forgotPassword:
      "Password reset link was sent to your mail please open your mail",
    notFound: `User not found`,
    providePassword: `Please provide password`,
    inCorrectPassword: `Password is incorrect`,
    passWordNotMatch: `Current password does not match`,
    receiver: {
      from: "somerandom@gmail.com",
      subject: "Password Reset Request",
      text: (
        url: string
      ) => `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${url}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    },
    transporter: {
      service: "gmail",
      port: 465,
      secure: true,
      pool: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: env.Email,
        pass: env.Password,
      },
      tls: {
        rejectUnAuthorized: true,
      },
    } as SMTPPool | SMTPPool.Options,
  },
  user: {
    getAll: `Users fetched successfully`,
    get: `User fetched successfully`,
  },
  order: {
    add: `Order created successfully`,
    getAll: `Orders fetched successfully`,
    get: `Order fetched successfully`,
    edit: `Order update successfully`,
    delete: `Order delete successfully`,
    addBulk: `Bulk orders created successfully`,
    updateBulk: `Bulk orders updated successfully`,
    deleteBulk: `Bulk orders deleted successfully`,
  },
  default: "Something went wrong",
} as const;

export { ResponseMessages };
