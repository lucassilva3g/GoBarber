import { useMutation } from "react-query";

import { api } from "@/lib/axios";

const updateAddress = async (data: UpdateAddressCommand) => {
  const response = await api.put<CreateSuccess>(
    `api/Addresses/${data.id}`,
    data,
  );

  return response.data;
};

export const useUpdateAddressMutation = () => {
  return useMutation(updateAddress, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
