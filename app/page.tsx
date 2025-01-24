import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import styles from "@/app/styles/home.module.css"
import SearchBar from "@/app/components/SearchBar"
import Header from "@/app/components/Header"
import Sidebar from "@/app/components/Sidebar"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login") // ログインしていない場合は /login にリダイレクト
  }

  return (
    <div className={styles.container}>
      {/* ヘッダー */}
      <Header />

      <div className={styles.contentWrapper}>
        {/* 左側サイドバー */}
        <Sidebar />

        {/* メインコンテンツ */}
        <main className={styles.mainContent}>
          <SearchBar />
        </main>
      </div>
    </div>
  )
}