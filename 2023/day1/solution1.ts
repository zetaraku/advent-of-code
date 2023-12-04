import { Digit } from "./utils.ts";
import { getChars, getLines, sum } from "../shared_utils.ts";

function calibrationValueOf(line: string): number {
  const chars = getChars(line);

  const firstDigit = chars.find((c) => /^[1-9]$/.test(c))! as Digit;
  const lastDigit = chars.findLast((c) => /^[1-9]$/.test(c))! as Digit;

  return Number(`${firstDigit}${lastDigit}`);
}

export default function main(input: string) {
  const calibrationValues = getLines(input).map((line) =>
    calibrationValueOf(line)
  );

  return sum(calibrationValues);
}
