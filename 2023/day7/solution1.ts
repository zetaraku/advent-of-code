import { calcTotalWinnings, Card, Hand, HandType } from "./utils.ts";
import { getLines, listEqual } from "../shared_utils.ts";

function parseCards(labelsText: string): Card[] {
  const strengthMapping: Record<string, number> = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const cardLabels: string[] = [...labelsText];

  return cardLabels.map((cardLabel) => ({
    label: cardLabel,
    strength: strengthMapping[cardLabel],
  }));
}

function typeOfHand(cards: Card[]): HandType {
  const distribution = Object.entries(
    Object.groupBy(cards, (card) => card.label),
  )
    .map(([, cardLabels]) => cardLabels.length)
    .toSorted((a, b) => b - a);

  if (listEqual(distribution, [5])) return HandType.FIVE_OF_A_KIND;
  if (listEqual(distribution, [4, 1])) return HandType.FOUR_OF_A_KIND;
  if (listEqual(distribution, [3, 2])) return HandType.FULL_HOUSE;
  if (listEqual(distribution, [3, 1, 1])) return HandType.THREE_OF_A_KIND;
  if (listEqual(distribution, [2, 2, 1])) return HandType.TWO_PAIR;
  if (listEqual(distribution, [2, 1, 1, 1])) return HandType.ONE_PAIR;
  if (listEqual(distribution, [1, 1, 1, 1, 1])) return HandType.HIGH_CARD;

  throw new Error("Unknown HandType.");
}

function parseHand(line: string): Hand {
  const [labelsText, bidText] = line.split(" ");

  const cards = parseCards(labelsText);

  return {
    cards,
    type: typeOfHand(cards),
    bid: Number(bidText),
  };
}

export default function main(input: string) {
  const hands = getLines(input).map((line) => parseHand(line));

  return calcTotalWinnings(hands);
}
