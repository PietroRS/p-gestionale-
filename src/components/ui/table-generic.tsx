import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
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
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())

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

  // Gestione selezione
  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map(row => keyExtractor(row))))
    }
  }

  const toggleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const isAllSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length

  return (
    <div className={cn('rounded-lg border bg-card shadow-sm', className)}>
      {/* Barra superiore con ricerca e filtri */}
      {searchable && (
        <div className="flex items-center justify-between gap-4 border-b p-4 bg-muted/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca ordini..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button variant="outline" size="default" className="gap-2">
            <Filter className="h-4 w-4" />
            Tutti gli stati
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
            Aggiorna
          </Button>
        </div>
      )}

      {/* Tabella */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                />
              </th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Azioni
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0) + 1}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const rowId = keyExtractor(row)
                const isSelected = selectedRows.has(rowId)
                
                return (
                  <tr
                    key={rowId}
                    className={cn(
                      'border-b transition-colors',
                      isSelected && 'bg-muted/50',
                      !isSelected && 'hover:bg-muted/30',
                      onRowClick && 'cursor-pointer'
                    )}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(rowId)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      />
                    </td>
                    {columns.map((column, colIndex) => {
                      const value = typeof column.key === 'string' 
                        ? getNestedValue(row, column.key)
                        : row[column.key]
                      
                      return (
                        <td key={colIndex} className="px-4 py-4" onClick={() => onRowClick?.(row)}>
                          {column.render ? column.render(value, row) : String(value || '')}
                        </td>
                      )
                    })}
                    {actions && actions.length > 0 && (
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          {actions.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={(e) => {
                                e.stopPropagation()
                                action.onClick(row)
                              }}
                              title={action.label}
                              className="p-1.5 rounded hover:bg-muted transition-colors"
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer con paginazione */}
      {pagination.enabled && (
        <div className="flex items-center justify-between border-t px-6 py-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Mostrando {Math.min((currentPage - 1) * (pagination.pageSize || 10) + 1, filteredData.length)}-{Math.min(currentPage * (pagination.pageSize || 10), filteredData.length)} di {filteredData.length} risultati
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-3">
              Pagina {currentPage} di {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
