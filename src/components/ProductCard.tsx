"use client"

import styles from './ProductCard.module.css';
import { useCart } from "@/src/contexts/CartContext";
import { getEffectivePrice } from "@/src/utils/price";
import type { Product } from "@/src/types/apiTypes";

type ProductCardProps = {
    product: Product
}

export const ProductCard = ( { product }: ProductCardProps ) => {

    const { brand, description, id, image, price, promotion, title } = product
    const { addToCart, addingIds } = useCart()
    const isAdding = addingIds.has(id)

    return (
    <div className={styles.card}>
        {/*{description}*/}
        <div className={styles.imageWrapper}>
            <img src={brand.logo} alt={brand.name + " "} className={styles.brandLogo}/>
            <img
                src={image.url}
                alt={image.altText}
                onError={(e) => {
                    e.currentTarget.src = "/image_not_found.png";
                }}
                className={styles.image}
            />
            {promotion && (
                <span className={styles.promotionBadge}>{promotion.name}</span>
            )}
        </div>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>
        {description}
        </span>
        <div className={styles.priceRow}>
            {promotion ? (
                <>
                    <span className={styles.priceOriginal}>${price.toFixed(2)}</span>
                    <span className={styles.priceDiscounted}>
                        ${getEffectivePrice(product).toFixed(2)}
                    </span>
                </>
            ) : (
                <span className={styles.price}>${price.toFixed(2)}</span>
            )}
        </div>
        <button
            className={styles.addButton}
            onClick={() => addToCart(product)}
            disabled={isAdding}
            type="button"
        >
            {isAdding ? "Adding..." : "Add to cart"}
        </button>
    </div>)
}