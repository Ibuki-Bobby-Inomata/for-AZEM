"use client"

import { useSession, signOut } from "next-auth/react"
import styles from "@/app/styles/home.module.css"

export default function Header() {
    const { data: session } = useSession()

    return (
        <header className={styles.header}>
            <img src="/azem_logo.png" alt="Azem Logo" className={styles.logo} />

            <div className={styles.userInfo}>
                {session ? (
                    <>
                        <img src={session.user?.image || "/default-avatar.png"} alt="User Avatar" className={styles.userAvatar} />
                        <span>{session.user?.name}</span>
                        <button onClick={() => signOut()} className={styles.signOutButton}>
                            Sign out
                        </button>
                    </>
                ) : (
                    <span>Loading...</span>
                )}
            </div>
        </header>
    )
}