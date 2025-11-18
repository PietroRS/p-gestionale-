// Interfaccia base per le colonne della tabella
export interface TableColumn<T> {
  key: keyof T | string
  header: string
  width?: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

// Interfaccia per le azioni della tabella
export interface TableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (row: T) => void
  variant?: 'default' | 'ghost' | 'outline'
}

// Interfaccia per la configurazione della tabella
export interface TableConfig<T> {
  data: T[]
  columns: TableColumn<T>[]
  actions?: TableAction<T>[]
  keyExtractor: (row: T) => string | number
  searchable?: boolean
  searchKeys?: (keyof T)[]
  pagination?: {
    enabled: boolean
    pageSize?: number
  }
  onRowClick?: (row: T) => void
  emptyMessage?: string
  className?: string
}

// Interfaccia base per i dati della tabella
export interface BaseTableData {
  id: string | number
}
