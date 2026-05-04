import type { Product } from "@/src/types/apiTypes";

type ProductCardProps = {
    product: Product
}

export const ProductCard = ( { product }: ProductCardProps ) => {

    const { brand, description, id, image, price, promotion, title } = product

    return (
    <div>
        {title}
        <img src={brand.logo} alt={brand.name}/>
        {description}
        {id}
        <img src={image.url} alt={image.altText} style={{ width: 200, height: 200 }}/>
        {price}
        {promotion?.name}
        {promotion?.percentage}
    </div>)
}