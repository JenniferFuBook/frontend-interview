const original = { name: 'Ada', address: { city: 'London' } };

const shallow = { ...original }; // Copies one level — address is shared.
shallow.address.city = 'Paris';
console.log(original.address.city); // 'Paris' — the mutation reached the original.

console.log(Object.is(original, shallow)); // false — top levels are different objects.
console.log(Object.is(original.address, shallow.address)); // true — the nested level is shared.

const deep = structuredClone(original); // True deep copy.
deep.address.city = 'Berlin';
console.log(original.address.city); // 'Paris' — unaffected.
