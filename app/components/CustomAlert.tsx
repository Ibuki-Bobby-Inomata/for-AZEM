import { useState } from "react"

export default function CustomAlert({ message }: { message: string }) {
    const [visible, setVisible] = useState(true)

    if (!visible) return null

    return (
        <div style={alertStyle}>
            {message}
            <button onClick={() => setVisible(false)} style={closeButtonStyle}>Close</button>
        </div>
    )
}

// スタイリング
const alertStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
}

const closeButtonStyle: React.CSSProperties = {
    marginLeft: "10px",
    border: "none",
    background: "white",
    color: "red",
    padding: "5px 10px",
    cursor: "pointer",
}