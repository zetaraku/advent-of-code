import { parseCards } from "./utils.ts";
import { sum } from "../shared_utils.ts";

function calcPoint(matchedCount: number) {
  return matchedCount > 0 ? (2 ** (matchedCount - 1)) : 0;
}

export default function main(input: string) {
  const scratchCards = parseCards(input);

  return sum(
    scratchCards
      .map((scratchCard) => scratchCard.matchedCount)
      .map((matchedCount) => calcPoint(matchedCount)),
  );
}
