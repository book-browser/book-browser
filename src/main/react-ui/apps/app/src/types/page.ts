export interface Page<E> {
  items: E[]
  totalPages: number
}

export const mapPageItems = <A, B>(p: Page<A>, mapper: (A) => B) => {
  return {
    items: p.items.map(mapper),
    totalPages: p.totalPages,
  } as Page<B>
} 