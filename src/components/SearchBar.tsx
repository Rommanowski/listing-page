"use client"

import { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
    onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [draft, setDraft] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(draft);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
            <div className={styles.inputWrapper}>
                <MagnifyingGlassIcon className={styles.icon} aria-hidden="true" />
                <input
                    type="search"
                    className={styles.input}
                    placeholder="Search products..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    aria-label="Search products"
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                Search
            </button>
        </form>
    );
};
