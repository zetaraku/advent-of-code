import { iota, listCompare, sum, zip } from "../shared_utils.ts";

export const enum HandType {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

export type Card = {
  label: string;
  strength: number;
};

export type Hand = {
  type: HandType;
  cards: Card[];
  bid: number;
};

export function compareHand(handA: Hand, handB: Hand): number {
  return (
    handA.type - handB.type
  ) || (
    listCompare(handA.cards, handB.cards, (a, b) => a.strength - b.strength)
  );
}

export function calcTotalWinnings(hands: Hand[]): number {
  return sum(
    zip(
      hands.toSorted((a, b) => compareHand(a, b)),
      iota(hands.length).map((index) => 1 + index),
    ).map(([hand, rank]) => hand.bid * rank),
  );
}
