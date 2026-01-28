import type { ComponentProps } from "react"

type FieldProps = ComponentProps<'div'> 

export function Filed(props: FieldProps) {
  return (
    <div className="form-group" {...props}/>
  )
}