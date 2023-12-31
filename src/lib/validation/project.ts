import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().min(1, { message: "Image Url is required" }),
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
