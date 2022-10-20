export type Page<E> = {
  items: E[];
  totalPages: number;
  totalElements: number;
};

export const mapPageItems = <A, B>(p: Page<A>, mapper: (A) => B) => {
  return {
    items: p.items.map(mapper),
    totalPages: p.totalPages,
    totalElements: p.totalElements
  } as Page<B>;
};
