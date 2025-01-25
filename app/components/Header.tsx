"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"


export default function Header() {
    const { data: session, status } = useSession()

    return (
        <header className="header">
            <Link href="/">
                <img src="/azem_logo.png" alt="Azem Logo" className="logo" />
            </Link>

            <div className="userInfo">
                {status === "loading" ? (
                    <span>Loading...</span>
                ) : session ? (
                    <>
                        <img src={session.user?.image || "/default-avatar.png"} alt="User Avatar" className="userAvatar" />
                        <span>{session.user?.name}</span>
                        <button onClick={() => signOut()} className="signOutButton">
                            Sign out
                        </button>
                    </>
                ) : (
                    <a href="/login">Sign in</a>
                )}
            </div>
        </header>
    )
}