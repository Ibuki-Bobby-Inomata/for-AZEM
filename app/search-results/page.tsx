"use client"

import { Suspense } from "react"
// import Layout from "@/app/components/Layout"
import SearchResults from "@/app/components/SearchResults"
import Header from "@/app/components/Header"
import Sidebar from "@/app/components/Sidebar"
import SearchBar from "@/app/components/SearchBar"

export default function SearchResultsPage() {
    return (
        <div className="=container">
            <Header />
            <div className="contentWrapper">
                <Sidebar />
                <main className="mainContent">
                    <SearchBar />
                    <Suspense fallback={<p>Loading...</p>}>
                        <SearchResults />
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

// <Layout>
//     <Suspense fallback={<p>Loading...</p>}>
//         <SearchResults />
//     </Suspense>
// </Layout>