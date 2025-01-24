"use client"

import { useState } from "react"
import styles from "@/app/styles/home.module.css"

export default function SearchBar() {
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert(`Searching for: ${query}`)
    }

    return (
        <form className={styles.searchBar} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="🔍 search new research"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />
        </form>
    )
}