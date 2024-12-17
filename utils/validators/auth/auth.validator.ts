import { IsEmail, MinLength } from "class-validator";
import { TUserChangePassword } from "../../../types/user";

class UserChangePasswordValidation implements TUserChangePassword {
  @IsEmail()
  email: string;

  @MinLength(8, { message: "currentPassword length is too short" })
  currentPassword: string;

  @MinLength(8, { message: "newPassword length is too short" })
  newPassword: string;
}

export { UserChangePasswordValidation };
