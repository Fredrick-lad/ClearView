import React, { useState, useMemo } from "react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import { formatCurrency } from "../utils/format";

export default function NotificationsView() {
  const { expenses, envelopeData } = useAuth();
  const { notifications, addNotification, clearNotifications } = GetData();

  const [markedReadAt, setMarkedReadAt] = useState(() => {
    return localStorage.getItem("notificationsReadAt") || "";
  });

  const styles = {
    serifText: { fontFamily: "Georgia, serif" },
    sectionHeader: { fontSize: "12px", letterSpacing: "0.05em" },
    cardBorder: "1px solid rgba(0, 0, 0, 0.12)",
    mintUnreadBg: "var(--cv-unread-bg)",
    unreadDotColor: "var(--cv-primary-dark)",
    olderCardBg: "var(--cv-older-card-bg)",
  };

  const budgetAlerts = useMemo(() => {
    const items: { date: Date; title: string; description: string; type: string }[] = [];
    const envelopes: any[] = Array.isArray(envelopeData) ? envelopeData : [];
    const alertedKeys = new Set<string>();

    for (const env of envelopes) {
      const spent = parseFloat(env.current_spend) || 0;
      const limit = parseFloat(env.monthly_limit) || 0;
      if (limit > 0 && spent / limit >= 0.9) {
        const key = `budget-${env.id}-${Math.floor(spent / limit * 10)}`;
        if (!alertedKeys.has(key)) {
          alertedKeys.add(key);
          items.push({
            date: new Date(),
            title: `Budget Alert: ${env.name}`,
            description: `You\u2019ve used ${Math.round((spent / limit) * 100)}% of your monthly ${env.name} budget.`,
            type: "alert",
          });
        }
      }
    }
    return items;
  }, [envelopeData, notifications]);

  const allItems = useMemo(() => {
    const items: { date: Date; title: string; description: string; type: string; id: string }[] = [
      ...budgetAlerts.map((a) => ({ ...a, id: `alert-${a.title}-${a.date.getTime()}` })),
      ...notifications.map((n) => ({
        date: new Date(n.timestamp),
        title: n.title,
        description: n.description,
        type: n.type,
        id: n.id,
      })),
    ];
    items.sort((a, b) => b.date.getTime() - a.date.getTime());
    return items;
  }, [budgetAlerts, notifications]);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayItems = allItems.filter((n) => n.date >= today);
  const yesterdayItems = allItems.filter(
    (n) => n.date >= yesterday && n.date < today
  );
  const olderItems = allItems.filter((n) => n.date < yesterday);

  const readTimestamp = markedReadAt ? new Date(parseInt(markedReadAt)).getTime() : 0;
  const unreadCount = allItems.filter((n) => n.date.getTime() > readTimestamp).length;

  const handleMarkAllRead = () => {
    const ts = Date.now().toString();
    setMarkedReadAt(ts);
    localStorage.setItem("notificationsReadAt", ts);
  };

  const timeAgo = (d: Date) => {
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const renderIcon = (type: string) => {
    if (type === "alert") {
      return (
        <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px", backgroundColor: "#FEF2F2" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#DC2626" style={{ width: "20px", height: "20px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
      );
    }
    if (type === "income") {
      return (
        <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px", backgroundColor: "#D1FAE5" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0A4433" style={{ width: "20px", height: "20px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a6.02 6.02 0 0 1 11.696 0M2.25 5.625c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-9.75Z" />
          </svg>
        </div>
      );
    }
    if (type === "envelope") {
      return (
        <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px", backgroundColor: "#EDF2FF" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#4F46E5" style={{ width: "20px", height: "20px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l9 6 9-6" />
          </svg>
        </div>
      );
    }
    if (type === "edit") {
      return (
        <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px", backgroundColor: "#FEF3C7" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#B45309" style={{ width: "20px", height: "20px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </div>
      );
    }
    return (
      <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px", backgroundColor: "#E0F2FE" }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0369A1" style={{ width: "20px", height: "20px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
    );
  };

  const renderItem = (item: { date: Date; title: string; description: string; type: string; id: string }) => {
    const isUnread = item.date.getTime() > readTimestamp;
    return (
      <div
        key={item.id}
        className={`card p-3 shadow-none rounded-3 ${isUnread ? "border-0" : "bg-white"}`}
        style={{
          border: isUnread ? "none" : styles.cardBorder,
          backgroundColor: isUnread ? styles.mintUnreadBg : "white",
          marginBottom: "12px",
        }}
      >
        <div className="d-flex gap-3">
          {renderIcon(item.type)}
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-baseline">
              <h5 className="h6 mb-1 fw-bold" style={styles.serifText}>
                {item.title}
              </h5>
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small">{timeAgo(item.date)}</span>
                {isUnread && (
                  <div className="rounded-circle" style={{ width: "7px", height: "7px", backgroundColor: styles.unreadDotColor }} />
                )}
              </div>
            </div>
            <p className="text-secondary small mb-0">{item.description}</p>
          </div>
        </div>
      </div>
    );
  };

  if (allItems.length === 0) {
    return (
      <div className="container-fluid py-4 text-dark" style={{ maxWidth: "1000px" }}>
        <div className="text-center py-5">
          <p className="text-muted mb-0">No notifications yet. Start adding income, expenses, and envelopes to see activity here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 text-dark" style={{ maxWidth: "1000px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 pt-2">
        <p className="mb-0 text-secondary" style={{ fontSize: "15px" }}>
          You have <strong className="text-dark fw-bold">{unreadCount} unread</strong> notification{unreadCount !== 1 ? "s" : ""}
        </p>
        <div className="d-flex gap-2">
          <button
            className="btn btn-white bg-white border px-3 py-2 d-flex align-items-center gap-2 fw-medium text-dark shadow-sm"
            style={{ borderRadius: "6px", fontSize: "14px", borderColor: "rgba(0, 0, 0, 0.15)" }}
            onClick={clearNotifications}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "16px", height: "16px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Clear All
          </button>
          <button
            className="btn btn-white bg-white border px-3 py-2 d-flex align-items-center gap-2 fw-medium text-dark shadow-sm"
            style={{ borderRadius: "6px", fontSize: "14px", borderColor: "rgba(0, 0, 0, 0.15)" }}
            onClick={handleMarkAllRead}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: "16px", height: "16px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Mark all as read
          </button>
        </div>
      </div>

      {todayItems.length > 0 && (
        <div className="mb-5">
          <h6 className="text-secondary fw-bold mb-3 uppercase" style={styles.sectionHeader}>TODAY</h6>
          {todayItems.map(renderItem)}
        </div>
      )}

      {yesterdayItems.length > 0 && (
        <div className="mb-5">
          <h6 className="text-secondary fw-bold mb-3" style={styles.sectionHeader}>YESTERDAY</h6>
          {yesterdayItems.map(renderItem)}
        </div>
      )}

      {olderItems.length > 0 && (
        <div className="mb-5">
          <h6 className="text-secondary fw-bold mb-3" style={styles.sectionHeader}>OLDER</h6>
          {olderItems.map(renderItem)}
        </div>
      )}

      <div className="border-top pt-4 mt-5 text-center">
        <p className="text-muted small mb-2 opacity-75">
          Notifications are stored locally and persist across sessions
        </p>
      </div>
    </div>
  );
}
