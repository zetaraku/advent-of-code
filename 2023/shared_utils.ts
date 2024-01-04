// Input

export function getLines(input: string): string[] {
  return input.split("\n").slice(0, -1);
}

export function getChars(input: string): string[] {
  return [...input];
}

// Range

export function iota(n: number): number[] {
  return [...Array(n).keys()];
}

export function range(start: number, end: number): number[] {
  return [...Array(end - start).keys()].map((delta) => start + delta);
}

export function indexes(dimensions: readonly number[]): number[][] {
  if (dimensions.length === 0) return [[]];

  const [firstDimension, ...otherDimensions] = dimensions;

  return [...Array(firstDimension).keys()].flatMap((index) =>
    indexes(otherDimensions).map((otherIndexes) => [index, ...otherIndexes])
  );
}

// Skip / Take

export function skip<T>(items: readonly T[], n: number): T[] {
  return items.slice(n);
}

export function skipWhile<T>(items: readonly T[], predicate: (item: T) => boolean): T[] {
  for (const [index, item] of items.entries()) {
    if (!predicate(item)) return items.slice(index);
  }

  return [];
}

export function skipUntil<T>(items: readonly T[], predicate: (item: T) => boolean): T[] {
  return skipWhile(items, (item) => !predicate(item));
}

export function take<T>(items: readonly T[], n: number): T[] {
  return items.slice(0, n);
}

export function takeWhile<T>(items: readonly T[], predicate: (item: T) => boolean): T[] {
  for (const [index, item] of items.entries()) {
    if (!predicate(item)) return items.slice(0, index);
  }

  return items.slice();
}

export function takeUntil<T>(items: readonly T[], predicate: (item: T) => boolean): T[] {
  return takeWhile(items, (item) => !predicate(item));
}

// Reduce

export function min(items: readonly number[]): number {
  return Math.min(...items);
}

export function max(items: readonly number[]): number {
  return Math.max(...items);
}

export function sum(items: readonly number[]): number {
  return items.reduce((acc, e) => acc + e, 0);
}

export function prod(items: readonly number[]): number {
  return items.reduce((acc, e) => acc * e, 1);
}

// Zip / Pairs

export function zip<T extends readonly (readonly unknown[])[]>(...lists: T): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const length = Math.min(...lists.map((list) => list.length));

  return [...Array(length).keys()].map((index) =>
    lists.map((list) => list[index]) as { [K in keyof T]: T[K] extends (infer V)[] ? V : never }
  );
}

export function pairs<T>(items: readonly T[]): [T, T][] {
  return zip(items, items.slice(1));
}

// Equality / Inequality

export function equal<T>(a: T, b: T): boolean {
  return a === b;
}

export function listEqual<T>(listA: readonly T[], listB: readonly T[], equalFn: (a: T, b: T) => boolean = equal): boolean {
  return equal(listA.length, listB.length) && zip(listA, listB).every(([a, b]) => equalFn(a, b));
}

export function compare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return +1;

  return 0;
}

export function listCompare<T>(listA: readonly T[], listB: readonly T[], compareFn: (a: T, b: T) => number = compare): number {
  for (const [a, b] of zip(listA, listB)) {
    const comparison = compareFn(a, b);
    if (comparison !== 0) return comparison;
  }

  return compare(listA.length, listB.length);
}

// Misc

export function deepLog(item: unknown): void {
  return console.dir(item, { depth: null });
}
