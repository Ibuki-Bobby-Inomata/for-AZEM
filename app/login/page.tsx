"use client"
import GoogleSignInButton from "@/app/components/GoogleSignInButton"

export default function LoginPage() {
    return (
        <div style={loginContainerStyle}>
            <h1 style={titleStyle}>Login to for AZEM</h1>
            <GoogleSignInButton />
        </div>
    )
}

// スタイリング
const loginContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f4f4f4", // 背景色の追加（オプション）
}

const titleStyle: React.CSSProperties = {
    fontSize: "48px",  // タイトルサイズを大きく
    fontWeight: "bold",  // 太字にする
    color: "#333",  // 濃いめのグレー
    marginBottom: "20px",  // 下部の余白
}

const buttonStyle: React.CSSProperties = {
    padding: "15px 30px",  // ボタンサイズを少し大きく
    fontSize: "18px",  // ボタンのフォントサイズを大きく
    borderRadius: "5px",
    backgroundColor: "#4285F4",  // Googleブルー
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
}

// ボタンのホバー効果（オプション）
buttonStyle[":hover"] = {
    backgroundColor: "#357ae8",
}