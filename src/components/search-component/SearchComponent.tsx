import { useState, useTransition } from 'react';

interface SearchComponentProps {
  items: string[];
}

const SearchComponent = ({ items }: SearchComponentProps) => {
  const [query, setQuery] = useState<string>(''); // Track the search query
  const [results, setResults] = useState<string[]>(items); // Track filtered results
  const [isPending, startTransition] = useTransition(); // Hook for managing transitions

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // High-priority update for the input field

    // Low-priority update to filter the list of items
    startTransition(async () => {
      // Simulate a slow data source.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After an await, wrap state updates in another startTransition
      // so React keeps them as part of the same transition.
      startTransition(() => {
        setResults(
          items.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
          )
        );
      });
    });
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search items..."
        aria-label="Search items"
      />
      {isPending && <p>Loading...</p>}
      <ul>
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default SearchComponent;
