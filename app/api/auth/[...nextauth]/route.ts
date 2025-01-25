import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,  // 1日（24時間）でセッション期限切れ
    },
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl  // ホームページへリダイレクト
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

// Next.js 13+ の App Router 仕様に従ったエクスポート
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export default handler