import type { BaseTableData } from './table.types'

// Stato dell'ordine
export const StatoOrdine = {
  IN_LAVORAZIONE: 'In lavorazione',
  COMPLETATO: 'Completato',
  SPEDITO: 'Spedito',
  ANNULLATO: 'Annullato'
} as const

export type StatoOrdine = typeof StatoOrdine[keyof typeof StatoOrdine]

// Priorità dell'ordine
export const PrioritaOrdine = {
  ALTA: 'alta',
  MEDIA: 'media',
  BASSA: 'bassa'
} as const

export type PrioritaOrdine = typeof PrioritaOrdine[keyof typeof PrioritaOrdine]

// Interfaccia principale per un ordine
export interface Ordine extends BaseTableData {
  id: string
  cliente: string
  email: string
  prodotto: string
  quantita: number
  data: string
  stato: StatoOrdine
  importo: number
  priorita: PrioritaOrdine
}

// Type guard per verificare se un dato è un Ordine
export function isOrdine(data: any): data is Ordine {
  return (
    typeof data === 'object' &&
    'id' in data &&
    'cliente' in data &&
    'email' in data &&
    'prodotto' in data &&
    'quantita' in data &&
    'data' in data &&
    'stato' in data &&
    'importo' in data &&
    'priorita' in data
  )
}
