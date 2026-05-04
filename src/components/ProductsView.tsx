"use client"

import { useMemo, useState } from "react";
import { Header } from "./Header";
import { ProductList } from "./ProductList";
import type { Image, Product } from "@/src/types/apiTypes";
import styles from './ProductsView.module.css'

type ProductsViewProps = {
    logo: Image
    products: Product[]
}

export const ProductsView = ({ logo, products }: ProductsViewProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return products;
        return products.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
        );
    }, [products, searchQuery]);

    return (
        <div className={styles.productsView}>
            <Header logo={logo} onSearch={setSearchQuery} />
            <main>
                <ProductList products={filteredProducts} />
            </main>
        </div>
    );
};
