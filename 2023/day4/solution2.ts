import { parseCards } from "./utils.ts";
import { iota, sum, take } from "../shared_utils.ts";

export default function main(input: string) {
  const scratchCards = parseCards(input);

  const numbersOfCards = iota(scratchCards.length).map(() => 1);

  for (const [i, scratchCard] of scratchCards.entries()) {
    for (const j of take(iota(scratchCards.length).slice(i + 1), scratchCard.matchedCount)) {
      numbersOfCards[j] += numbersOfCards[i];
    }
  }

  return sum(numbersOfCards);
}
