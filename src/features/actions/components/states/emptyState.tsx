type props = {
    message?: string;
}

export function EmptyState({ message = "Aucune action disponible." }: props) {
    return (
        <div role="status" className="empty-state" aria-live="polite">
            <span className="empty-icon" aria-hidden="true">📭</span>
            <span className="empty-message">{message}</span>
        </div>
    );
}