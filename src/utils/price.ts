import type {Product} from "@/src/types/apiTypes";

export const getEffectivePrice = (p: Product): number =>
    p.promotion ? p.price * (1 - p.promotion.percentage / 100) : p.price;