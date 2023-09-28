import { useMutation } from "react-query";

import { api } from "@/lib/axios";

const getByZipCode = async (data: GetAddressQuery) => {
  const response = await api.get<SearchAddressViewModel>("api/Addresses", {
    data,
  });
  return response.data;
};

export const useGetAddressByZipCode = () => {
  return useMutation(getByZipCode, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
