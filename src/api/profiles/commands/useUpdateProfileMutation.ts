import { useMutation } from "react-query";

import { api } from "@/lib/axios";

const updateProfile = async (data: UpdateProfileCommand) => {
  const response = await api.put<CreateSuccess>("api/Profile", data);
  return response.data;
};

export const useUpdateProfileMutation = () => {
  return useMutation(updateProfile, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
