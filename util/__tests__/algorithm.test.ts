import { expect, test } from '@jest/globals';

const testArray1 = [
  { id: 1, name: 'Test', price: 2, image: '', quantity: 2 },
  { id: 2, name: 'Test', price: 2.5, image: '', quantity: 3 },
];
const testArray2 = [
  { id: 1, name: 'Test', price: 2, image: '', quantity: 1 },
  { id: 2, name: 'Test', price: 2.5, image: '', quantity: 3390391 },
];

test('sumQuantity', () => {
  // expect().toBe(5);
});
