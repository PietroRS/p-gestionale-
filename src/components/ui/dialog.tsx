import React from 'react'

type DialogProps = {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  forceDark?: boolean
}

export const Dialog = ({ open, onOpenChange, children, forceDark }: DialogProps) => {
  return (
    <div>
      {open ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange?.(false)}
          />
          <div className={`relative z-50 ${forceDark ? 'dark' : ''}`}>{children}</div>
        </div>
      ) : null}
    </div>
  )
}

Dialog.displayName = "Dialog"

export const DialogContent = ({ children }: { children?: React.ReactNode }) => {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const htmlHasDark = document.documentElement.classList.contains('dark')
    const bodyHasDark = document.body && document.body.classList && document.body.classList.contains('dark')
    const mediaDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return htmlHasDark || bodyHasDark || !!mediaDark
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setIsDark(document.documentElement.classList.contains('dark') || mq.matches)
    handler()
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else if ((mq as any).addListener) (mq as any).addListener(handler)
    // also observe mutations to documentElement.classList (in case theme toggles by adding/removing 'dark')
    const obs = new MutationObserver(() => handler())
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      obs.disconnect()
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else if ((mq as any).removeListener) (mq as any).removeListener(handler)
    }
  }, [])

  return (
    <div
      className={`${isDark ? 'dark' : ''} dialog-root w-[90vw] max-w-4xl max-h-[90vh] text-foreground dark:text-white rounded-lg p-6 shadow-xl overflow-auto border border-border`}
      style={isDark ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
    >
      <style>{`
        /* Force dialog children to adopt dark-friendly backgrounds/colors when dialog is in dark mode */
        .dialog-root.dark .dialog-scope .bg-white { background-color: transparent !important; }
        .dialog-root.dark .dialog-scope .bg-card { background-color: transparent !important; }
        .dialog-root.dark .dialog-scope .bg-background { background-color: transparent !important; }
        .dialog-root.dark .dialog-scope .text-gray-900 { color: inherit !important; }
        .dialog-root.dark .dialog-scope input,
        .dialog-root.dark .dialog-scope textarea,
        .dialog-root.dark .dialog-scope select {
          background-color: #0b1220 !important;
          color: #fff !important;
          border-color: #374151 !important;
        }
        .dialog-root.dark .dialog-scope ::placeholder { color: rgba(255,255,255,0.45) !important; }
      `}</style>
      <div className="dialog-scope">{children}</div>
    </div>
  )
}
DialogContent.displayName = "DialogContent"

export const DialogHeader = ({ children, onClose }: { children?: React.ReactNode, onClose?: () => void }) => {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div className="flex-1">{children}</div>
    </div>
  )
}
DialogHeader.displayName = "DialogHeader"

export const DialogTitle = ({ children }: { children?: React.ReactNode }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>
}
DialogTitle.displayName = "DialogTitle"

export default Dialog
