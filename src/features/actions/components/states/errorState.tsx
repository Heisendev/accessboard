type props = {
    message?: string;
}

export function ErrorState({ message = "Une erreur est survenue. Veuillez réessayer plus tard." }: props) {
    return (
        <div role="alert" className="error-state" aria-live="assertive">
            <span className="error-icon" aria-hidden="true">⚠️</span>
            <span className="error-message">{message}</span>
        </div>
    );
}