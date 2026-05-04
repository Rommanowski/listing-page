"use client"

import { ChangeEvent } from "react";
import type { Product } from "@/src/types/apiTypes";
import styles from "./FiltersPanel.module.css";

export type SortOption =
    | "default"
    | "price-asc"
    | "price-desc"
    | "title-asc"
    | "title-desc"

export type Filters = {
    sort: SortOption;
    priceMin: number | null;
    priceMax: number | null;
    promotionsOnly: boolean;
    brands: string[];
};

export const DEFAULT_FILTERS: Filters = {
    sort: "default",
    priceMin: null,
    priceMax: null,
    promotionsOnly: false,
    brands: [],
};

type FiltersPanelProps = {
    products: Product[];
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
};

const parsePriceInput = (e: ChangeEvent<HTMLInputElement>): number | null => {
    const v = e.target.value;
    if (v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? n : null;
};

export const FiltersPanel = ({ products, filters, onFiltersChange }: FiltersPanelProps) => {
    const setPartial = (next: Partial<Filters>) =>
        onFiltersChange({ ...filters, ...next });

    const availableBrands = [...new Set(products.map((p) => p.brand.name))].sort();

    const toggleBrand = (brand: string) => {
        const next = filters.brands.includes(brand)
            ? filters.brands.filter((b) => b !== brand)
            : [...filters.brands, brand];
        setPartial({ brands: next });
    };

    return (
        <aside className={styles.panel}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>Filters</h2>
                <button
                    type="button"
                    className={styles.resetButton}
                    onClick={() => onFiltersChange(DEFAULT_FILTERS)}
                >
                    Reset
                </button>
            </div>

            <section className={styles.section}>
                <label className={styles.sectionTitle} htmlFor="filter-sort">
                    Sort
                </label>
                <select
                    id="filter-sort"
                    className={styles.select}
                    value={filters.sort}
                    onChange={(e) => setPartial({ sort: e.target.value as SortOption })}
                >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="title-asc">Title: A-Z</option>
                    <option value="title-desc">Title: Z-A</option>
                </select>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Price (USD)</h3>
                <div className={styles.priceRow}>
                    <input
                        type="number"
                        className={styles.priceInput}
                        placeholder="Min"
                        value={filters.priceMin ?? ""}
                        onChange={(e) => setPartial({ priceMin: parsePriceInput(e) })}
                        min={0}
                        aria-label="Minimum price"
                    />
                    <span className={styles.priceDash} aria-hidden="true">—</span>
                    <input
                        type="number"
                        className={styles.priceInput}
                        placeholder="Max"
                        value={filters.priceMax ?? ""}
                        onChange={(e) => setPartial({ priceMax: parsePriceInput(e) })}
                        min={0}
                        aria-label="Maximum price"
                    />
                </div>
            </section>

            <section className={styles.section}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={filters.promotionsOnly}
                        onChange={(e) => setPartial({ promotionsOnly: e.target.checked })}
                    />
                    <span>Promotions only</span>
                </label>
            </section>

            {availableBrands.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Brand</h3>
                    <div className={styles.brandList}>
                        {availableBrands.map((brand) => (
                            <label key={brand} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={filters.brands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>
                </section>
            )}
        </aside>
    );
};
