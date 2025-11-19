import React from 'react'

type DialogProps = {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <div>
      {open ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
          <div className="relative z-50">{children}</div>
        </div>
      ) : null}
    </div>
  )
}

Dialog.displayName = "Dialog"

export const DialogContent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-[90vw] max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded p-4 shadow-lg overflow-auto">{children}</div>
  )
}
DialogContent.displayName = "DialogContent"

export const DialogHeader = ({ children }: { children?: React.ReactNode }) => {
  return <div className="mb-2">{children}</div>
}
DialogHeader.displayName = "DialogHeader"

export const DialogTitle = ({ children }: { children?: React.ReactNode }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>
}
DialogTitle.displayName = "DialogTitle"

export default Dialog
