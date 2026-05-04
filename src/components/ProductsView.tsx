"use client"

import { useMemo, useState } from "react";
import { Header } from "./Header";
import { ProductList } from "./ProductList";
import { FiltersPanel, DEFAULT_FILTERS, type Filters } from "./FiltersPanel";
import { CartProvider } from "@/src/contexts/CartContext";
import { getEffectivePrice } from "@/src/utils/price";
import styles from "./ProductsView.module.css";
import type { Image, Product } from "@/src/types/apiTypes";

type ProductsViewProps = {
    logo: Image
    products: Product[]
}


export const ProductsView = ({ logo, products }: ProductsViewProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

    const visibleProducts = useMemo(() => {
        let result = products;

        const q = searchQuery.trim().toLowerCase();
        if (q) {
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
            );
        }

        const { priceMin, priceMax, promotionsOnly, brands, sort } = filters;

        if (priceMin !== null) result = result.filter((p) => getEffectivePrice(p) >= priceMin);
        if (priceMax !== null) result = result.filter((p) => getEffectivePrice(p) <= priceMax);

        if (promotionsOnly) result = result.filter((p) => p.promotion !== null);

        if (brands.length > 0) {
            result = result.filter((p) => brands.includes(p.brand.name));
        }

        if (sort !== "default") {
            result = [...result].sort((a, b) => {
                switch (sort) {
                    case "price-asc":
                        return getEffectivePrice(a) - getEffectivePrice(b);
                    case "price-desc":
                        return getEffectivePrice(b) - getEffectivePrice(a);
                    case "title-asc":
                        return a.title.localeCompare(b.title);
                    case "title-desc":
                        return b.title.localeCompare(a.title);
                    default:
                        return 0;
                }
            });
        }

        return result;
    }, [products, searchQuery, filters]);

    return (
        <CartProvider>
            <div className={styles.productsView}>
                <Header logo={logo} onSearch={setSearchQuery} />
                <main className={styles.main}>
                    <FiltersPanel
                        products={products}
                        filters={filters}
                        onFiltersChange={setFilters}
                    />
                    <ProductList products={visibleProducts} />
                </main>
            </div>
        </CartProvider>
    );
};
