import type { ComponentProps } from "react"

type FieldProps = ComponentProps<'div'> 

export function Field(props: FieldProps) {
  return (
    <div className="form-group" {...props}/>
  )
}