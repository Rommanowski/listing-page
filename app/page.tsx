import { ProductList } from "@/src/components/ProductList";
import { Header } from "@/src/components/Header";
import { getProducts } from "@/src/utils/api";

export default async function Home() {

    const { logo, products } = await getProducts()
  return (
      <>
          <Header logo={logo}/>
          <main>
              <ProductList products={products}/>
          </main>
      </>
  );
}
