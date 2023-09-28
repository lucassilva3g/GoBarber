import { useMutation } from "react-query";

import { api } from "@/lib/axios";

const createAddress = async (data: CreateAddressCommand) => {
  const response = await api.post<CreateSuccess>("api/Addresses", data);
  return response.data;
};

export const useCreateAddressMutation = () => {
  return useMutation(createAddress, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
