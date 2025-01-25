"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"


export default function Header() {
    const { data: session, status } = useSession()

    return (
        <header className="header">
            <Link href="/">
                <Image src="/azem_logo.png" alt="Azem Logo" className="logo"
                    width={10}
                    height={10}
                    sizes="100vw"
                    priority={true}  // 優先的に読み込む
                    style={{ width: "100px", height: "auto" }} />
            </Link>

            <div className="userInfo">
                {status === "loading" ? (
                    <span>Loading...</span>
                ) : session ? (
                    <>
                        <Image src={session.user?.image || "/default-avatar.png"} alt="User Avatar" className="userAvatar" width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
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