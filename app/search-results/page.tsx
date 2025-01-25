"use client"

import { Suspense } from "react"
import Layout from "@/app/components/Layout"
import SearchResults from "@/app/components/SearchResults"

export default function SearchResultsPage() {
    return (
        <Layout>
            <Suspense fallback={<p>Loading...</p>}>
                <SearchResults />
            </Suspense>
        </Layout>
    )
}