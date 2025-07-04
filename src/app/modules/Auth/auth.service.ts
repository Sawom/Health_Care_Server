import { UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";

// user login with access token, then a refresh token is given from system. 
// refresh token is assigned for long time and access token is for short time. 
// after access time is over then refresh token again provide a access token in backend
const loginUser = async (payload: { email: string; password: string }) => {
  // if user status is active then check the password.

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  // password is compared with bcrypt password and user password
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  //   access token generate
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg", // secret key
    "5m" // validity 5 mins
  );

  //   refresh token generate
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghgijklmnop",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {

}

export const AuthServices = {
    loginUser,
    refreshToken
}