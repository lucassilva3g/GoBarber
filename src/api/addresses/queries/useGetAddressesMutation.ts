import { useMutation } from "react-query";

import { api } from "@/lib/axios";

const createAddress = async () => {
  const response = await api.get<AddressViewModel>("api/Addresses");
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
