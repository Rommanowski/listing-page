"use client"

import styles from './Header.module.css'
import type { Image } from "@/src/types/apiTypes";

type HeaderProps = {
    logo: Image
}

export const Header = ( { logo }: HeaderProps) => {

    return(
        <div className={styles.header}>
            <img src={logo.url} alt={logo.altText}/>
        </div>
    )
}