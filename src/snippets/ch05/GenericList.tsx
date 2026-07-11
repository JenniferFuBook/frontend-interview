import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// T is inferred as { id: number; name: string } from the items prop.
const markup = renderToStaticMarkup(
  <List
    items={[
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bo' },
    ]}
    renderItem={(item) => <li key={item.id}>{item.name}</li>}
  />,
);
console.log(markup); // <ul><li>Alice</li><li>Bo</li></ul>
