import type { Product } from "@/src/types/apiTypes";
import { ProductCard } from "./ProductCard";

type Props = {
    products: Product[];
};

export const ProductList = ({ products }: Props) => {

    console.log(products)

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}