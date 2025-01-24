"use client"

import styles from "@/app/styles/home.module.css"

const recentItems = [
    { id: 1, title: "New Feature Update", date: "2025-01-20" },
    { id: 2, title: "Project Overview", date: "2025-01-22" },
    { id: 3, title: "Meeting Notes", date: "2025-01-23" },
]

export default function RecentRecords() {
    return (
        <div className={styles.recentRecords}>
            <h2>Recently Viewed</h2>
            <ul>
                {recentItems.map((item) => (
                    <li key={item.id} className={styles.recordItem}>
                        <span>{item.title}</span>
                        <span className={styles.recordDate}>{item.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}