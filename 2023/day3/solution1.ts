import { hasAdjacentSymbol, isDigit, isNumberBegin } from "./utils.ts";
import { getChars, getLines, indexes, range, sum, takeWhile } from "../shared_utils.ts";

export default function main(input: string) {
  const schematic = getLines(input).map((line) => getChars(line));

  const m = schematic.length;
  const n = schematic[0].length;

  const partNumbers = indexes([m, n])
    .filter(([i, j]) => isNumberBegin(schematic, [i, j]))
    .flatMap(([i, jBegin]) => {
      const digitIndexes = takeWhile(
        range(jBegin, n).map((j) => [i, j] as const),
        ([i, j]) => isDigit(schematic[i][j]),
      );

      // not a part number
      if (!digitIndexes.some(([i, j]) => hasAdjacentSymbol(schematic, [i, j]))) return [];

      return [Number(digitIndexes.map(([i, j]) => schematic[i][j]).join(""))];
    });

  return sum(partNumbers);
}
