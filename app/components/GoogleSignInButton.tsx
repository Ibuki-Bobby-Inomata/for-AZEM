"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

export default function GoogleSignInButton() {
    return (
        <button style={googleButtonStyle} onClick={() => signIn("google")}>
            <Image
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Icon"
                style={iconStyle}
                width={20}   // 必要な幅を指定
                height={20}
            />            Continue with Google
        </button>
    )
}

const googleButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "30px",
    backgroundColor: "#fff",
    color: "#555",
    border: "1px solid #ddd",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
}

const iconStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
}