import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    // サインイン後のリダイレクト先
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,  // 1日（24時間）でセッション期限切れ
    },
    // ログイン後のリダイレクト設定などを行う場合
    callbacks: {
        async redirect({ baseUrl }) {
            // デフォルトでは / (ホーム) にリダイレクト
            return baseUrl
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

// Next.js 13 の Route Handler
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }