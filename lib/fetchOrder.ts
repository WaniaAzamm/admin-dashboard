import { sanityClient } from "./sanityClient";

export async function getOrders() {
  const query = `*[_type == "order"] {
    _id,
    user {
      firstName,
      lastName,
      address,
      city,
      country,
      postalCode
    },
    cart[] {
      name,
      price,
      quantity,
      inventory,
      discountPercentage
    },
    total,
    paymentMethod,
    status
  }`;

  return await sanityClient.fetch(query);
}
