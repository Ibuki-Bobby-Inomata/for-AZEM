import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AuthProvider from "@/app/AuthProvider"
import "./globals.css"

export const metadata = {
  title: "for AZEM",
  description: "Jira-like Web App",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // サーバー側でセッションを取得（動的なデータをクライアントに渡す）
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", color: "#555", fontSize: "14px" }}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}