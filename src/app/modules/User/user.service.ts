import {
  Admin,
  Doctor,
  Patient,
  Prisma,
  UserRole,
  UserStatus,
} from "@prisma/client";
import * as bcrypt from "bcrypt";
// we perform prisma for database so we need to use *PrismaClient*
import { Request } from "express";
import { fileUploader } from "../../../helpars/fileUploader";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { IFile } from "../../interfaces/file";
import { IPaginationOptions } from "../../interfaces/pagination";
import { userSearchAbleFields } from "./user.constant";

// createAdmin createDoctor, createPatient, with profile img upload with Cloudinary
const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;

  /**
   * CHANGE 1: ডাটা হ্যান্ডলিং
   * রাউটারে 'req.body.data' পার্স করার পর req.body এর স্ট্রাকচার এখন:
   * { password: '...', admin: { name: '...', email: '...' } }
   */
  let adminData = req.body.admin;

  // যদি কোনো কারণে adminData স্ট্রিং হিসেবে আসে (FormData behavior), তবে সেটি পার্স করা
  if (typeof adminData === "string") {
    adminData = JSON.parse(adminData);
  }

  if (file) {
    /**
     * CHANGE 2: ক্লাউডিনারি আপলোড
     * এটি এখন আমাদের নতুন memoryStorage লজিক ব্যবহার করবে (file.buffer)।
     * Vercel-এ আর ENOENT এরর আসবে না।
     */
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    // প্রোফাইল ফটোর লিঙ্কটি সরাসরি admin অবজেক্টে সেট করা
    adminData.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // পাসওয়ার্ড হ্যাশ করা (সরাসরি req.body থেকে)
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: adminData.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  /**
   * CHANGE 3: ডাটাবেজ ট্রানজেকশন
   * ট্রানজেকশন ব্যবহার করা হয়েছে যাতে ইউজার এবং অ্যাডমিন—উভয় টেবিলে ডাটা
   * একই সাথে সেভ হয় অথবা কোনো এরর হলে কিছুই সেভ না হয়।
   */
  const result = await prisma.$transaction(async (transactionClient) => {
    // ইউজার ক্রিয়েট করা
    await transactionClient.user.create({
      data: userData,
    });

    // অ্যাডমিন ক্রিয়েট করা (এখানে adminData এর ভেতর এখন profilePhoto আছে)
    const createdAdminData = await transactionClient.admin.create({
      data: adminData,
    });

    return createdAdminData;
  });

  return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor, // ** doctor ** table name
    });

    return createdDoctorData;
  });

  return result;
};

const createPatient = async (req: Request): Promise<Patient> => {
  const file = req.file as IFile;

  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
    req.body.patient.profilePhoto = uploadedProfileImage?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdPatientData = await transactionClient.patient.create({
      data: req.body.patient,
    });

    return createdPatientData;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.UserWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    // skip password and get others data with select query
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      patient: true,
      doctor: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeProfileStatus = async (id: string, status: UserRole) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });

  return updateUserStatus;
};

// get user's own profile
const getMyProfile = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });

  let profileInfo;

  // if user is a admin get data from admin table, if user is a doctor then get data from doctor table
  // if user is patient get data from patient table
  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

// update user's profile
const updateMyProfie = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }

  return { ...profileInfo };
};

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};
