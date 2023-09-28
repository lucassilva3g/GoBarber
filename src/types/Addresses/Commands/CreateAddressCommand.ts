type CreateAddressCommand = {
  isPrimaryAddress?: boolean;
  receiverName: string;
  phone: string;
  deliveryAddress: DeliveryAddress;
};
