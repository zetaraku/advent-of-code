import { getLines, prod, zip } from "../shared_utils.ts";
import { Race, waysToBeatRecord } from "./utils.ts";

function parseRaces(input: string): Race[] {
  const [times, distances] = getLines(input).map((line) =>
    [...line.matchAll(/(\d+)/g)].map(([, numberText]) => Number(numberText))
  );

  return zip(times, distances).map(([time, distance]) => ({ time, distance }));
}

export default function main(input: string) {
  const races = parseRaces(input);

  return prod(races.map((race) => waysToBeatRecord(race)));
}
