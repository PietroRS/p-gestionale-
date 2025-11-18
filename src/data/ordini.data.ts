import type { Ordine } from '@/types/ordine.types'
import { StatoOrdine, PrioritaOrdine } from '@/types/ordine.types'

export const ordiniData: Ordine[] = [
  {
    id: 'ORD-001',
    cliente: 'Mario Rossi',
    email: 'mario.rossi@email.it',
    prodotto: 'Stampa 3D Prototipo',
    quantita: 2,
    data: '15/11/2025',
    stato: StatoOrdine.IN_LAVORAZIONE,
    importo: 250.00,
    priorita: PrioritaOrdine.ALTA
  },
  {
    id: 'ORD-002',
    cliente: 'Laura Bianchi',
    email: 'laura.bianchi@email.it',
    prodotto: 'Componente Meccanico',
    quantita: 5,
    data: '14/11/2025',
    stato: StatoOrdine.COMPLETATO,
    importo: 450.00,
    priorita: PrioritaOrdine.MEDIA
  },
  {
    id: 'ORD-003',
    cliente: 'Giuseppe Verdi',
    email: 'giuseppe.verdi@email.it',
    prodotto: 'Pezzo di Ricambio',
    quantita: 1,
    data: '13/11/2025',
    stato: StatoOrdine.SPEDITO,
    importo: 180.00,
    priorita: PrioritaOrdine.BASSA
  },
  {
    id: 'ORD-004',
    cliente: 'Anna Ferrari',
    email: 'anna.ferrari@email.it',
    prodotto: 'Modello Architettonico',
    quantita: 3,
    data: '12/11/2025',
    stato: StatoOrdine.IN_LAVORAZIONE,
    importo: 620.00,
    priorita: PrioritaOrdine.ALTA
  },
  {
    id: 'ORD-005',
    cliente: 'Carlo Neri',
    email: 'carlo.neri@email.it',
    prodotto: 'Prototipo Industriale',
    quantita: 1,
    data: '11/11/2025',
    stato: StatoOrdine.COMPLETATO,
    importo: 890.00,
    priorita: PrioritaOrdine.MEDIA
  },
  {
    id: 'ORD-006',
    cliente: 'Francesca Russo',
    email: 'francesca.russo@email.it',
    prodotto: 'Componente Elettronico',
    quantita: 10,
    data: '10/11/2025',
    stato: StatoOrdine.SPEDITO,
    importo: 320.00,
    priorita: PrioritaOrdine.BASSA
  },
  {
    id: 'ORD-007',
    cliente: 'Roberto Esposito',
    email: 'roberto.esposito@email.it',
    prodotto: 'Gadget Personalizzato',
    quantita: 50,
    data: '09/11/2025',
    stato: StatoOrdine.IN_LAVORAZIONE,
    importo: 150.00,
    priorita: PrioritaOrdine.MEDIA
  },
  {
    id: 'ORD-008',
    cliente: 'Giulia Conti',
    email: 'giulia.conti@email.it',
    prodotto: 'Stampa 3D Artistico',
    quantita: 2,
    data: '08/11/2025',
    stato: StatoOrdine.COMPLETATO,
    importo: 420.00,
    priorita: PrioritaOrdine.ALTA
  }
]
