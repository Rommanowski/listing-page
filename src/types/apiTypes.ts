export type Image = { url: string; altText: string };
export type Promotion = { name: string; percentage: number };
export type Product = {
  id: string;
  image: Image;
  title: string;
  description: string;
  brand: { name: string; logo: string };
  price: number;
  promotion: Promotion | null;
};
