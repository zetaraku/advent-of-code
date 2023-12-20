import { getLines } from "../shared_utils.ts";
import { Race, waysToBeatRecord } from "./utils.ts";

function parseRace(input: string): Race {
  const [time, distance] = getLines(input)
    .map((line) => line.replaceAll(" ", "").match(/(\d+)/)!)
    .map(([, numberText]) => Number(numberText));

  return { time, distance };
}

export default function main(input: string) {
  const race = parseRace(input);

  return waysToBeatRecord(race);
}
