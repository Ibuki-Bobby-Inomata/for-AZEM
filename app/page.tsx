import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Header from "@/app/components/Header"
import Sidebar from "@/app/components/Sidebar"
import SearchBar from "@/app/components/SearchBar"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container">
      <Header />
      <div className="contentWrapper">
        <Sidebar />
        <main className="mainContent">
          <SearchBar />
        </main>
      </div>
    </div>
  )
}