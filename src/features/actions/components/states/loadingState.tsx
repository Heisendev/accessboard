type Props = {
    label?: string;
}

export function LoadingState({ label = "Chargement en cours..." }: Props) {
    return (
        <div role="status" aria-live="polite" className="loading-state" aria-busy="true">
            <span className="spinner" aria-hidden="true"></span>
            <span className="loading-label">{label}</span>
        </div>
    );
}