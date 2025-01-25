"use client"

import { useSession, signOut } from "next-auth/react"
import styles from "@/app/styles/home.module.css"
import Image from "next/image"

export default function MyPageInfo() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <p>Please sign in</p>
    }

    return (
        <div className={styles.myPageInfo}>
            <Image src={session.user?.image || "/default-avatar.png"} alt="Profile" className={styles.profileImage} />
            <h3>{session.user?.name}</h3>
            <p>{session.user?.email}</p>
            <button onClick={() => signOut()} className={styles.logoutButton}>Sign out</button>
        </div>
    )
}