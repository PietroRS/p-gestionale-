import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import type { TableConfig, BaseTableData } from '@/types/table.types'
import { cn } from '@/lib/utils'

interface GenericTableProps<T extends BaseTableData> {
  config: TableConfig<T>
}

export function GenericTable<T extends BaseTableData>({ config }: GenericTableProps<T>) {
  const {
    data,
    columns,
    actions,
    keyExtractor,
    searchable = false,
    searchKeys = [],
    pagination = { enabled: false, pageSize: 10 },
    onRowClick,
    emptyMessage = 'Nessun dato disponibile',
    className
  } = config

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filtro dei dati in base alla ricerca
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data

    return data.filter((row) => {
      return searchKeys.some((key) => {
        const value = row[key]
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    })
  }, [data, searchTerm, searchKeys, searchable])

  // Paginazione
  const paginatedData = useMemo(() => {
    if (!pagination.enabled) return filteredData

    const pageSize = pagination.pageSize || 10
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage, pagination])

  const totalPages = Math.ceil(filteredData.length / (pagination.pageSize || 10))

  // Funzione per ottenere il valore annidato
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  return (
    <div className={cn('rounded-lg border bg-card shadow-sm', className)}>
      {/* Barra di ricerca */}
      {searchable && (
        <div className="border-b p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      )}

      {/* Tabella */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                  Azioni
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className={cn(
                    'transition-colors hover:bg-muted/50',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column, colIndex) => {
                    const value = typeof column.key === 'string' 
                      ? getNestedValue(row, column.key)
                      : row[column.key]
                    
                    return (
                      <td key={colIndex} className="px-6 py-4">
                        {column.render ? column.render(value, row) : String(value || '')}
                      </td>
                    )
                  })}
                  {actions && actions.length > 0 && (
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1">
                        {actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant={action.variant || 'ghost'}
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              action.onClick(row)
                            }}
                            title={action.label}
                          >
                            {action.icon}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer con paginazione */}
      {pagination.enabled && (
        <div className="flex items-center justify-between border-t px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Mostrando{' '}
            <span className="font-medium">
              {Math.min((currentPage - 1) * (pagination.pageSize || 10) + 1, filteredData.length)}
            </span>{' '}
            -{' '}
            <span className="font-medium">
              {Math.min(currentPage * (pagination.pageSize || 10), filteredData.length)}
            </span>{' '}
            di <span className="font-medium">{filteredData.length}</span> risultati
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Precedente
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Successivo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
