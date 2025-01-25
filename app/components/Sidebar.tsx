"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Sidebar() {
    const { data: session } = useSession()

    return (
        <aside className="sidebar">
            {session ? (
                <>
                    <Image src={session.user?.image || "/default-avatar.png"} alt="User Avatar" className="userAvatar" />
                    <h3>{session.user?.name}</h3>
                    <p>Recentory you saved</p>
                    <input type="text" placeholder="🔍 search your saved" className="searchInputSaved" />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </aside>
    )
}