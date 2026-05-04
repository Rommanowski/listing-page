import { ProductsView } from "@/src/components/ProductsView";
import { getProducts } from "@/src/utils/api";

export default async function Home() {
    const { logo, products } = await getProducts();
    return <ProductsView logo={logo} products={products} />;
}
