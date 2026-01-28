import { useFormContext } from "react-hook-form"

import type { ComponentProps } from "react"

type InputProps = ComponentProps<'input'> & {
  name: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <input {...props} {...register(props.name)}/>
  )
}