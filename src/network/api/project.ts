import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from "@/lib/validation/project";
import api from "@/network/axiosInstance";
import { toFormData } from "@/utils/utils";
import { Project } from "@prisma/client";

const baseUrl = "projects";

export async function createProject(input: CreateProjectSchema) {
  const formData = toFormData(input);
  const response = await api.post<Project>(baseUrl, formData);
  return response.data;
}

export async function findProjects(userId: string) {
  const response = await api.get<Project[]>(`${baseUrl}/${userId}`);
  return response.data;
}

export async function updateProject(input: UpdateProjectSchema) {
  const response = await api.put<Project>(baseUrl, input);
  return response.data;
}

export async function deleteProject(projectId: string) {
  const response = await api.delete<Project>(baseUrl, {
    data: { id: projectId },
  });
  return response.data;
}

export async function searchProjects(search: string = "") {
  const response = await api.get<Project[]>(
    `${baseUrl}/search?search=${search}`,
  );
  return response.data;
}
