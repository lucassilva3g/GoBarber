type UpdateAddressCommand = {
  id: string;
  isPrimaryAddress?: boolean;
  receiverName: string;
  phone: string;
  deliveryAddress: DeliveryAddress;
};
