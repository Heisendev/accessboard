import type { InputHTMLAttributes } from 'react'

type Props = {
  label: string
  id: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  label,
  id,
  error,
  ...props
}: Props) => {
  return (
    <div className="flex gap-1 mb-4">
      <label htmlFor={id} className="font-medium">{label}</label>

      <input
        id={id}
        className={`rounded-md border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          error
            ? 'border-red-500'
            : 'border-gray-300'
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
