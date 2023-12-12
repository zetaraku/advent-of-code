import { isDigit, isNumberBegin, isValidIndex } from "./utils.ts";
import { getChars, getLines, indexes, prod, range, sum, takeWhile } from "../shared_utils.ts";

export default function main(input: string) {
  const schematic = getLines(input).map((line) => getChars(line));

  const m = schematic.length;
  const n = schematic[0].length;

  const numbers = indexes([m, n])
    .filter(([i, j]) => isNumberBegin(schematic, [i, j]))
    .map(([i, jBegin]) => {
      const digitIndexes = takeWhile(
        range(jBegin, n).map((j) => [i, j] as const),
        ([i, j]) => isDigit(schematic[i][j]),
      );

      const adjacentIndexes = [
        ...[digitIndexes.at(0)!].flatMap(([i, j]) => [
          [i - 1, j - 1],
          [i, j - 1],
          [i + 1, j - 1],
        ]),
        ...digitIndexes.flatMap(([i, j]) => [
          [i - 1, j],
          [i + 1, j],
        ]),
        ...[digitIndexes.at(-1)!].flatMap(([i, j]) => [
          [i - 1, j + 1],
          [i, j + 1],
          [i + 1, j + 1],
        ]),
      ].filter(([i, j]) => isValidIndex(schematic, [i, j]));

      return {
        number: Number(digitIndexes.map(([i, j]) => schematic[i][j]).join("")),
        adjacentIndexes,
      };
    });

  function getAdjacentNumbers(index: [i: number, j: number]) {
    const [i, j] = index;

    return numbers.filter(({ adjacentIndexes }) =>
      adjacentIndexes.find(([ii, jj]) => ii === i && jj === j)
    ).map(({ number }) => number);
  }

  const gears = indexes([m, n])
    .filter(([i, j]) => schematic[i][j] === "*")
    .map(([i, j]) => getAdjacentNumbers([i, j]))
    .filter((adjacentNumbers) => adjacentNumbers.length === 2)
    .map((adjacentNumbers) => prod(adjacentNumbers));

  return sum(gears);
}
