"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import CustomAlert from "@/app/components/CustomAlert"

export default function UserProfile() {
    const { data: session, status } = useSession()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (status === "unauthenticated") {
            setErrorMessage("ログインし直してください")
            setTimeout(() => {
                signOut({ callbackUrl: "/login" })
            }, 3000)  // 3秒後にログアウト
        }
    }, [status])

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return null
    }

    return (
        <div style={profileContainerStyle}>
            {errorMessage && <CustomAlert message={errorMessage} />}
            <img src={session.user?.image || "/default-avatar.png"} alt="Profile" style={profileImageStyle} />
            <div>
                <p style={profileNameStyle}>{session.user?.name}</p>
                <p style={profileEmailStyle}>{session.user?.email}</p>
            </div>
            <button style={logoutButtonStyle} onClick={() => signOut({ callbackUrl: "/login" })}>
                Sign out
            </button>
        </div>
    )
}

// スタイリング
const profileContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
}

const profileImageStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
}

const profileNameStyle: React.CSSProperties = {
    margin: "0",
    fontSize: "14px",
    fontWeight: "bold",
}

const profileEmailStyle: React.CSSProperties = {
    margin: "0",
    fontSize: "12px",
    color: "#777",
}

const logoutButtonStyle: React.CSSProperties = {
    fontSize: "12px",
    padding: "5px 10px",
    backgroundColor: "#696969",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
}