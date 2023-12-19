import { getLines } from "../shared_utils.ts";

export type Range = { start: number, end: number };
export type MapRange = { start: number, end: number, delta: number };

export function getSections(input: string): string[] {
  return input.split(/(?<=\n)\n/);
}

export function parseMapSection(mapSection: string): MapRange[] {
  return getLines(mapSection).slice(1).map((line) => {
    const [destStart, srcStart, rangeLength] = line.split(" ")
      .map((numberText) => Number(numberText));

    return {
      start: srcStart,
      end: srcStart + rangeLength,
      delta: destStart - srcStart,
    };
  });
}
