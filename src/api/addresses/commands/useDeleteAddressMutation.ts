import { useMutation } from "react-query";

import { api } from "@/lib/axios";

const deleteAddress = async (data: DeleteAddressCommand) => {
  const response = await api.delete<CreateSuccess>(`api/Addresses/${data.id}`, {
    data: data,
  });

  return response.data;
};

export const useDeleteAddressMutation = () => {
  return useMutation(deleteAddress, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
