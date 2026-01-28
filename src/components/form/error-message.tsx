import { useFormContext } from "react-hook-form"

type ErrorMessageProps = {
  field: string
}

export function ErrorMessage({field}: ErrorMessageProps) {

  const { formState: { errors } } = useFormContext()

  const error = errors[field]

  if (!error) return null
  return (
    <span className="form-error">{error.message?.toString()}</span>
  )
}