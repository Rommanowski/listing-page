"use client"

import type { Product } from "@/src/types/apiTypes";
import styles from './ProductCard.module.css';

type ProductCardProps = {
    product: Product
}

export const ProductCard = ( { product }: ProductCardProps ) => {

    const { brand, description, id, image, price, promotion, title } = product

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
        <span>
        {description}
        </span>
        <div className={styles.priceRow}>
            {promotion ? (
                <>
                    <span className={styles.priceOriginal}>{price} zł</span>
                    <span className={styles.priceDiscounted}>
                        {Math.round(price * (1 - promotion.percentage / 100))} zł
                    </span>
                </>
            ) : (
                <span className={styles.price}>{price} zł</span>
            )}
        </div>
        <button>Add to cart</button>
    </div>)
}