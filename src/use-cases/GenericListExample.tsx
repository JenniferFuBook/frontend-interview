// This example is contained in a single file for simplicity.
// In a real-world application, you would split the components into separate files.
import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// T is inferred as { id: number; name: string } from the items prop,
// and renderItem is type-checked against that same type.
const GenericListExample = () => (
  <List
    items={[
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bo' },
    ]}
    renderItem={(item) => <li key={item.id}>{item.name}</li>}
  />
);

export default GenericListExample;
