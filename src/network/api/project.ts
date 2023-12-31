import api from "@/network/axiosInstance";
import { Project } from "@prisma/client";

const baseUrl = "projects";

export interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
}

export async function createProject(input: ProjectFormData) {
  const response = await api.post<Project>(baseUrl, input);
  return response.data;
}

export async function findProjects(userId: string) {
  const response = await api.get<Project[]>(`${baseUrl}/${userId}`);
  return response.data;
}
