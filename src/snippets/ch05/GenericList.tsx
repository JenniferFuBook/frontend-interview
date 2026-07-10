import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// T is inferred as { id: number; name: string } from the items prop.
export const example = (
  <List
    items={[{ id: 1, name: 'Alice' }]}
    renderItem={(item) => <li key={item.id}>{item.name}</li>}
  />
);
