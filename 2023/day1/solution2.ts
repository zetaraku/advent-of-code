import { Digit, GeneralDigit } from "./utils.ts";
import { getLines, sum } from "../shared_utils.ts";

function digitFrom(generalDigit: GeneralDigit): Digit {
  const digitMapping: Record<GeneralDigit, Digit> = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  return digitMapping[generalDigit];
}

function calibrationValueOf(line: string): number {
  const firstDigit = digitFrom(
    line.match(
      /([1-9]|one|two|three|four|five|six|seven|eight|nine).*/,
    )![1] as GeneralDigit,
  );
  const lastDigit = digitFrom(
    line.match(
      /.*([1-9]|one|two|three|four|five|six|seven|eight|nine)/,
    )![1] as GeneralDigit,
  );

  return Number(`${firstDigit}${lastDigit}`);
}

export default function main(input: string) {
  const calibrationValues = getLines(input).map((line) =>
    calibrationValueOf(line)
  );

  return sum(calibrationValues);
}
