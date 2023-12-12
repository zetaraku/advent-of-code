const ADJACENT_DELTAS = [
  [-1, -1],
  [-1, 0],
  [-1, +1],
  [0, -1],
  [0, +1],
  [+1, -1],
  [+1, 0],
  [+1, +1],
] satisfies [di: number, dj: number][];

export function isBlank(c: string): boolean {
  return c === ".";
}

export function isDigit(c: string): boolean {
  return /^\d$/.test(c);
}

export function isSymbol(c: string): boolean {
  return !isBlank(c) && !isDigit(c);
}

export function isValidIndex(schematic: string[][], index: [i: number, j: number]): boolean {
  const m = schematic.length;
  const n = schematic[0].length;

  const [i, j] = index;

  return (i >= 0 && i < m) && (j >= 0 && j < n);
}

export function isNumberBegin(schematic: string[][], index: [i: number, j: number]): boolean {
  const [i, j] = index;

  return (
    isDigit(schematic[i][j]) &&
    (j === 0 || !isDigit(schematic[i][j - 1]))
  );
}

export function hasAdjacentSymbol(schematic: string[][], index: [i: number, j: number]) {
  const [i, j] = index;

  return ADJACENT_DELTAS
    .map(([di, dj]) => [i + di, j + dj])
    .filter(([i, j]) => isValidIndex(schematic, [i, j]))
    .map(([i, j]) => schematic[i][j])
    .some((c) => isSymbol(c));
}
