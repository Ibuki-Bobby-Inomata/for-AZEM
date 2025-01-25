"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "@/app/styles/home.module.css"

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // alert(`Searching for: ${query}`)
        if (query.trim()) {
            router.push(`/search-results?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <form className={styles.searchBar} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="🔍 search arXiv papers"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />
        </form>
    )
}