import api from "@/network/axiosInstance";

const baseUrl = "users";

export async function searchUsers(username: string = "") {
  const response = await api.get(`${baseUrl}?username=${username}`);
  return response.data;
}
