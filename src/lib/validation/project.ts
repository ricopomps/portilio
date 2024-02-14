import { z } from "zod";

const fileImageSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an image file")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const createProjectSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subtitle: z.string().min(1, { message: "Subtitle is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: fileImageSchema,
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export const findProjectsSchema = z.object({
  userId: z.string().min(1, { message: "UserId is required" }),
});

export type FindProjectsSchema = z.infer<typeof findProjectsSchema>;

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string().min(1),
});

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export const deleteProjectSchema = z.object({
  id: z.string().min(1),
});

export const searchProjectsSchema = z.object({
  search: z.string().optional(),
});

export type SearchProjectsSchema = z.infer<typeof searchProjectsSchema>;

export const searchUserSchema = z.object({
  username: z.string().optional(),
});
