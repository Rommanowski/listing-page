import type { Product } from "@/src/types/apiTypes";
import { ProductCard } from "./ProductCard";

type Props = {
    products: Product[];
};

export const ProductList = ({ products }: Props) => {

    console.log(products)

    return (
        <div>
            {products.slice(0, 1).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}