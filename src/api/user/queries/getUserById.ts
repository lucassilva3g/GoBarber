import { api } from "@/lib/axios";

export const getUserById = async (data: GetUserQuery) => {
  const response = await api.get<UserViewModel>(`api/Users/${data.id}`);
  return response.data;
};
