import { z } from 'zod';

const PaginationConst = {
  defaultPageNo: 1,
  defaultSizePerPage: 27,
  maxSizePerPage: 100,
};

export const PaginationSchema = z.object({
  pageNo: z.number().min(1).optional().default(PaginationConst.defaultPageNo),
  pageSize: z
    .number()
    .min(1)
    .max(PaginationConst.maxSizePerPage)
    .optional()
    .default(PaginationConst.defaultSizePerPage),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const CommonSearchDTOSchema = PaginationSchema.partial().extend({
  query: z.string().optional(),
});
export type CommonSearchDTO = z.infer<typeof CommonSearchDTOSchema>;

export const PaginationInfoSchema = z.object({
  pageNo: z.number(),
  pageSize: z.number(),
  total: z.number(),
});
export type PaginationInfo = z.infer<typeof PaginationInfoSchema>;

export const BasePaginationInfoSchema = z.object({
  pagination: PaginationInfoSchema,
  data: z.unknown(),
});
