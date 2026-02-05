import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    id: string;
    error?: string;
};

export const Select = ({ label, id, error, children, ...props }: Props) => {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label htmlFor={id} className="font-medium">{label}</label>
            <select
                id={id}
                className={`rounded-md border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                {...props}
            >
                {children}
            </select>
            {error && (
                <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}