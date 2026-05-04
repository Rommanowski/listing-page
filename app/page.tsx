import { ProductList } from "@/src/components/ProductList";
import { getProducts } from "@/src/utils/api";

export default async function Home() {

    const { logo, products } = await getProducts()
  return (
      <>
          <main>
              <ProductList products={products}/>
          </main>
      </>
  );
}
