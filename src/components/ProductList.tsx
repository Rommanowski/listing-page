import type { Product } from "@/src/types/apiTypes";
import { ProductCard } from "./ProductCard";
import styles from "./ProductList.module.css";

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  console.log(products);

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
