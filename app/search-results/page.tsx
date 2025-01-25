"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Layout from "@/app/components/Layout"
import styles from "@/app/styles/search.module.css"
import SearchBar from "@/app/components/SearchBar"

export default function SearchResultsPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (query) {
            fetchResults(query)
        }
    }, [query])

    const fetchResults = async (searchQuery: string) => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://export.arxiv.org/api/query?search_query=all:${searchQuery}&start=0&max_results=10`
            )
            const xmlText = await response.text()
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(xmlText, "text/xml")

            const entries = Array.from(xmlDoc.getElementsByTagName("entry")).map((entry) => ({
                id: entry.getElementsByTagName("id")[0]?.textContent,
                title: entry.getElementsByTagName("title")[0]?.textContent,
                summary: entry.getElementsByTagName("summary")[0]?.textContent,
                updated: entry.getElementsByTagName("updated")[0]?.textContent,
                published: entry.getElementsByTagName("published")[0]?.textContent,
                author: entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent,
                link: entry.getElementsByTagName("link")[0]?.getAttribute("href"),
                primary_category: entry.getElementsByTagName("arxiv:primary_category")[0]?.getAttribute("term"),
                category: Array.from(entry.getElementsByTagName("category")).map(cat => cat.getAttribute("term")),
                doi: entry.getElementsByTagName("arxiv:doi")[0]?.textContent || "N/A",
                journal_ref: entry.getElementsByTagName("arxiv:journal_ref")[0]?.textContent || "N/A",
                comment: entry.getElementsByTagName("arxiv:comment")[0]?.textContent || "No comments",
            }))

            setResults(entries)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
        setLoading(false)
    }

    return (
        <Layout>
            <SearchBar />
            <h1>Search Results for: {query}</h1>

            {loading && <p>Loading...</p>}

            <div className={styles.resultsList}>
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <div key={index} className={styles.resultCard}>
                            <h2>{result.title}</h2>
                            <p><strong>ID:</strong> {result.id}</p>
                            <p><strong>Published:</strong> {result.published}</p>
                            <p><strong>Updated:</strong> {result.updated}</p>
                            <p><strong>Author:</strong> {result.author}</p>
                            <p><strong>Summary:</strong> {result.summary}</p>
                            <p><strong>Primary Category:</strong> {result.primary_category}</p>
                            <p><strong>Categories:</strong> {result.category.join(", ")}</p>
                            <p><strong>DOI:</strong> {result.doi}</p>
                            <p><strong>Journal Reference:</strong> {result.journal_ref}</p>
                            <p><strong>Comments:</strong> {result.comment}</p>
                            <a href={result.link} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>
                    ))
                ) : (
                    !loading && <p>No results found.</p>
                )}
            </div>
        </Layout>
    )
}