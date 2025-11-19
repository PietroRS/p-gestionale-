export type Tecnologia = {
  id: string
  nome: string
  categoria: string
  tag: string[]
  descrizione: string
  densita_kg_m3: number
  resistenza_mpa: number
  temp_max_c: number
  costo_eur: number
  certificazioni: string[]
  datasheetUrl?: string
  immagini?: string[]
  [key: string]: any
}
