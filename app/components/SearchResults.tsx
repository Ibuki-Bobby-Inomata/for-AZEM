"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import styles from "@/app/styles/search.module.css"

interface ArxivEntry {
    id: string
    title: string
    summary: string
    updated: string
    published: string
    author: string
    link: string
    primary_category: string
    category: string[]
    doi: string
    journal_ref: string
    comment: string
}

function buildArxivQuery({
    query,
    category,
    startDate,
    endDate,
}: {
    query: string
    category?: string
    startDate?: string
    endDate?: string
}) {
    const words = query
        .split(/\s+/)
        .map((w) => w.trim())
        .filter(Boolean)

    let finalQuery = words.map((word) => `all:${word}`).join("+AND+")

    if (category) {
        finalQuery += `+AND+cat:${category}`
    }

    if (startDate && endDate) {
        finalQuery += `+AND+submittedDate:[${startDate} TO ${endDate}]`
    }

    return finalQuery
}

export default function SearchResults() {
    const searchParams = useSearchParams()
    const rawQuery = searchParams.get("q") || ""

    const [page, setPage] = useState(1)
    const pageSize = 10

    const [category, setCategory] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [sortBy, setSortBy] = useState<"relevance" | "lastUpdatedDate">("relevance")

    // ↓ resultsを ArxivEntry[] で宣言
    const [results, setResults] = useState<ArxivEntry[]>([])
    const [loading, setLoading] = useState(false)

    // 2. missing dependency への対策
    // useCallback を使い、依存関係を明示する
    const fetchResults = useCallback(async () => {
        setLoading(true)
        try {
            const finalQuery = buildArxivQuery({ query: rawQuery, category, startDate, endDate })
            const startIndex = (page - 1) * pageSize

            const url = `https://export.arxiv.org/api/query?search_query=${finalQuery}&start=${startIndex}&max_results=${pageSize}&sortBy=${sortBy}&sortOrder=descending`
            const response = await fetch(url)
            const xmlText = await response.text()

            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(xmlText, "text/xml")

            const entries: ArxivEntry[] = Array.from(xmlDoc.getElementsByTagName("entry")).map((entry) => ({
                id: entry.getElementsByTagName("id")[0]?.textContent ?? "",
                title: entry.getElementsByTagName("title")[0]?.textContent ?? "",
                summary: entry.getElementsByTagName("summary")[0]?.textContent ?? "",
                updated: entry.getElementsByTagName("updated")[0]?.textContent ?? "",
                published: entry.getElementsByTagName("published")[0]?.textContent ?? "",
                author: entry.getElementsByTagName("author")[0]
                    ?.getElementsByTagName("name")[0]?.textContent || "",
                link: entry.getElementsByTagName("link")[0]?.getAttribute("href") || "",
                primary_category:
                    entry.getElementsByTagName("arxiv:primary_category")[0]?.getAttribute("term") || "",
                category: Array.from(entry.getElementsByTagName("category")).map(
                    (cat) => cat.getAttribute("term") || ""
                ),
                doi: entry.getElementsByTagName("arxiv:doi")[0]?.textContent || "N/A",
                journal_ref: entry.getElementsByTagName("arxiv:journal_ref")[0]?.textContent || "N/A",
                comment: entry.getElementsByTagName("arxiv:comment")[0]?.textContent || "No comments",
            }))

            setResults(entries)
        } catch (error) {
            console.error("Error fetching data:", error)
            setResults([])
        }
        setLoading(false)
    }, [rawQuery, category, startDate, endDate, sortBy, page, pageSize])

    // ページが変わったら先頭へ戻す
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    // 依存しているfetchResultsは useCallback で定義したのでOK
    useEffect(() => {
        if (!rawQuery) {
            setResults([])
            return
        }
        fetchResults()
    }, [rawQuery, fetchResults])

    // ページネーション
    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1)
    }
    const handleNextPage = () => {
        setPage(page + 1)
    }
    const handleGoToFirstPage = () => {
        setPage(1)
    }

    // フィルタをクリア
    const handleClearFilters = () => {
        setCategory("")
        setStartDate("")
        setEndDate("")
        setSortBy("relevance")
        setPage(1)
    }

    return (
        <div>
            {/* --- Advanced Filters & Sorting --- */}
            <div className={styles.searchFilters}>
                <h2>Advanced Filters</h2>
                <label>
                    Category:
                    <input
                        type="text"
                        placeholder="e.g. cs.LG"
                        value={category}
                        onChange={(e) => {
                            setPage(1)
                            setCategory(e.target.value)
                        }}
                    />
                </label>

                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                            setPage(1)
                            setStartDate(e.target.value)
                        }}
                    />
                </label>

                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                            setPage(1)
                            setEndDate(e.target.value)
                        }}
                    />
                </label>

                <label>
                    Sort by:
                    <select
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value as "relevance" | "lastUpdatedDate")
                        }}
                    >
                        <option value="relevance">Relevance</option>
                        <option value="lastUpdatedDate">Last Updated Date</option>
                    </select>
                    {/* <select
                        value={sortBy}
                        onChange={(e) => {
                            setPage(1)
                            setSortBy(e.target.value as any)
                        }}
                    > */}
                    <option value="relevance">Relevance</option>
                    <option value="lastUpdatedDate">Last Updated Date</option>
                </select>
            </label>

            <button onClick={handleClearFilters}>Clear</button>
        </div>

            {/* --- Loading & Results --- */ }
    <h2>Search Results for: {rawQuery}</h2>
    { loading && <p>Loading...</p> }
    <div className={styles.resultsList}>
        {!loading && results.length === 0 && <p>No results found.</p>}
        {results.map((result, index) => (
            <div key={index} className={styles.resultCard}>
                <h3>{result.title}</h3>
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
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
            </div>
        ))}
    </div>

    {/* --- Pagination --- */ }
    <div className={styles.pagination}>
        <button onClick={handleGoToFirstPage} disabled={page === 1}>
            Go to Page 1
        </button>
        <button onClick={handlePrevPage} disabled={page <= 1}>
            Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={results.length < pageSize}>
            Next
        </button>
    </div>
        </div >
    )
}