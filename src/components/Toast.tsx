import { Toast } from 'radix-ui'

type ToastComponentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  variant: 'error' | 'success' | 'warning' | 'info'
}

export function ToastComponent(props: ToastComponentProps) {
  const { open, onOpenChange, title, description, variant } = props
  return (
    <Toast.Root 
      className={`ToastRoot ${variant}`} 
      open={!!open} 
      onOpenChange={onOpenChange}
      >
      <Toast.Title className="ToastTitle">{title}</Toast.Title>
      <Toast.Description className="ToastDescription">
        {description}
      </Toast.Description>
    </Toast.Root>
  )
}