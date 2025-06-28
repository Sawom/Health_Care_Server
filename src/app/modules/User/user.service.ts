import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
// we perform prisma for database so we need to use *PrismaClient*
import prisma from "../../../shared/prisma";

const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  console.log(hashedPassword);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  //   here we create user and admn at the same time. so we use  transactionClient
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const userService = {
  createAdmin,
};
