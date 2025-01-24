"use client"

import { useSession } from "next-auth/react"
import styles from "@/app/styles/home.module.css"

export default function Sidebar() {
    const { data: session } = useSession()

    return (
        <aside className={styles.sidebar}>
            {session ? (
                <>
                    <img src={session.user?.image || "/default-avatar.png"} alt="User Avatar" className={styles.userAvatar} />
                    <h3>{session.user?.name}</h3>
                    <p>Recentory you saved</p>
                    <input type="text" placeholder="🔍 search your saved" className={styles.searchInputSaved} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </aside>
    )
}