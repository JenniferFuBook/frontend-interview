const products = [
  { name: 'Widget', price: 10, inStock: true },
  { name: 'Gadget', price: 25, inStock: false },
  { name: 'Doohickey', price: 15, inStock: true },
];

const available = products
  .filter(p => p.inStock) // [Widget, Doohickey]
  .map(p => ({ ...p, price: p.price * 1.1 })) // Apply 10% markup.
  .reduce((sum, p) => sum + p.price, 0); // Total: 27.5.

console.log(available);
