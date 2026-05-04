export const addToCartRequest = async (productId: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};
