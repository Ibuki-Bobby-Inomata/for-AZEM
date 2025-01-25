"use client"

import { useSession, signOut } from "next-auth/react"
import styles from "@/app/styles/home.module.css"
import Image from "next/image"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()

    return (
        <div className={styles.container}>
            {/* ヘッダー */}
            <header className={styles.header}>
                <img src="/azem_logo.png" alt="Azem Logo" className={styles.logo} />
                <div className={styles.userInfo}>
                    {session ? (
                        <>
                            <Image
                                src={session.user?.image || "/default-avatar.png"}
                                alt="User Avatar"
                                className={styles.userAvatar}
                            />
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

            <div className={styles.contentWrapper}>
                {/* サイドバー */}
                <aside className={styles.sidebar}>
                    {session ? (
                        <>
                            <img
                                src={session.user?.image || "/default-avatar.png"}
                                alt="User Avatar"
                                className={styles.userAvatar}
                            />
                            <h3>{session.user?.name}</h3>
                            <p>Recentory you saved</p>
                            <input
                                type="text"
                                placeholder="🔍 search your saved"
                                className={styles.searchInputSaved}
                            />
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </aside>

                {/* メインコンテンツ */}
                <main className={styles.mainContent}>{children}</main>
            </div>
        </div>
    )
}