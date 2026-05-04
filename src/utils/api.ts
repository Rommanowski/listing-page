import type { Image, Product } from "@/src/types/apiTypes";

type RawProduct = {
    articleNumber: string;
    ean: string;
    link: string;
    image: Image;
    title: string;
    description: string;
    brandName: string;
    brandLogo: string;
    price: number;
    promotion?: { name: string; percentage: number } | null;
};

type RawResponse = {
    title: string;
    logo: Image;
    products: RawProduct[];
};

const API_URL = process.env.API_URL!

export async function getProducts(): Promise<{ logo: Image; products: Product[] }> {
    const res = await fetch(API_URL, {
        headers: { "x-api-key": process.env.X_API_KEY! },
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const raw: RawResponse = await res.json();

    return {
        logo: raw.logo,
        products: raw.products.map((p) => ({
            id: p.articleNumber,
            image: p.image,
            title: p.title,
            description: p.description,
            brand: { name: p.brandName, logo: p.brandLogo },
            price: p.price,
            promotion: p.promotion ?? null,
        })),
    };
}
