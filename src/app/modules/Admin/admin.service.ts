import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchAbleFields } from "./admin.constant";

const getAllFromDB = async (params: any, options: any) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  // we store admin Searchable fields in an array for searching data
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        // any fields matches will show the result
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive", // case-insensitive search,
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      // if just one fields match then show data or no other fields are matched then show all data
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  //console.dir(andConditions, { depth: 'inifinity' })
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc", // descending order
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions, // conditions can be changed, so we need count of result as conditions
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

export const AdminService = {
  getAllFromDB,
};
