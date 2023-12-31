import api from "@/network/axiosInstance";
import { Project } from "@prisma/client";

const baseUrl = "/api/projects";

export interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
}

export async function createProject(input: ProjectFormData) {
  const response = await api.post<Project>(baseUrl, input);
  return response.data;
}
