"use client";

import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "./SearchBar";
import styles from "./Header.module.css";
import { useCart } from "@/src/contexts/CartContext";
import type { Image } from "@/src/types/apiTypes";

type HeaderProps = {
  logo: Image;
  onSearch: (query: string) => void;
};

export const Header = ({ logo, onSearch }: HeaderProps) => {
  const { items } = useCart();
  const cartCount = items.length;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <img src={logo.url} alt={logo.altText} className={styles.logo} />
        <SearchBar onSearch={onSearch} />
        <div className={styles.actions}>
          <button className={styles.actionButton} type="button">
            <UserIcon className={styles.actionIcon} aria-hidden="true" />
            <span>Your account</span>
          </button>
          <button
            className={styles.actionButton}
            type="button"
            aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          >
            <span className={styles.cartIconWrapper}>
              <ShoppingCartIcon
                className={styles.actionIcon}
                aria-hidden="true"
              />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
