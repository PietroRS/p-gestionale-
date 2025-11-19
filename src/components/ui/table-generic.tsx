import { useState, useMemo, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Search, ChevronLeft, ChevronRight, Filter, ChevronDown } from 'lucide-react'
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
  const [stateFilter, setStateFilter] = useState<string | null>(null)
  const [showStateMenu, setShowStateMenu] = useState(false)
  const stateMenuRef = useRef<HTMLDivElement | null>(null)

  // Filtro dei dati in base alla ricerca
  const filteredData = useMemo(() => {
    let result = data

    // apply search
    if (searchable && searchTerm) {
      result = result.filter((row) => {
        return searchKeys.some((key) => {
          const value = row[key]
          if (value === null || value === undefined) return false
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }

    // apply state filter if present (common property name 'stato')
    if (stateFilter) {
      result = result.filter((row) => {
        const val = (row as any)['stato']
        if (val === null || val === undefined) return false
        return String(val) === stateFilter
      })
    }

    return result
  }, [data, searchTerm, searchKeys, searchable, stateFilter])

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

  // derive unique states from data for filter menu
  const uniqueStates = useMemo(() => {
    const s = new Set<string>()
    data.forEach((row) => {
      const val = (row as any)['stato']
      if (val !== undefined && val !== null) s.add(String(val))
    })
    return Array.from(s)
  }, [data])

  // close menu on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!stateMenuRef.current) return
      if (!stateMenuRef.current.contains(e.target as Node)) {
        setShowStateMenu(false)
      }
    }
    if (showStateMenu) document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [showStateMenu])

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
          <div className="relative" ref={stateMenuRef}>
            <Button
              variant="outline"
              size="default"
              className="gap-2 flex items-center"
              onClick={() => setShowStateMenu((s) => !s)}
              aria-haspopup="menu"
              aria-expanded={showStateMenu}
            >
              <Filter className="h-4 w-4" />
              <span className="truncate max-w-[140px]">{stateFilter ?? 'Tutti gli stati'}</span>
              <ChevronDown className={"h-4 w-4 ml-1 transition-transform " + (showStateMenu ? 'rotate-180' : '')} />
            </Button>

            {showStateMenu && (
              <div className="absolute right-0 mt-2 w-56 z-50 rounded-md border bg-card/95 p-1 shadow-2xl ring-1 ring-black/20 backdrop-blur-sm overflow-hidden">
                <div className="px-2 py-2 text-xs text-muted-foreground font-medium">Filtra per stato</div>
                <div className="h-px bg-muted/50 my-1" />
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted/20 rounded text-foreground"
                  onClick={() => { setStateFilter(null); setShowStateMenu(false) }}
                >
                  Tutti gli stati
                </button>
                {uniqueStates.map((st) => (
                  <button
                    key={st}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted/20 rounded flex items-center justify-between text-foreground"
                    onClick={() => { setStateFilter(st); setShowStateMenu(false) }}
                  >
                    <span className="truncate">{st}</span>
                    {stateFilter === st && <span className="text-xs text-muted-foreground">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">{filteredData.length} risultati</div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
              onClick={() => { setSearchTerm(''); setStateFilter(null); setCurrentPage(1) }}
            >
              Aggiorna
            </Button>
          </div>
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
