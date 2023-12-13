import { getLines } from "../shared_utils.ts";

export function parseCards(input: string) {
  return getLines(input).map((line) => {
    const [cardIdText, cardBodyText] = line.split(":");

    const [, cardId] = cardIdText.trim().match(/^Card\s+(\d+)$/)!;

    const [winningNumbersText, myNumbersText] = cardBodyText.trim().split("|");

    const winningNumbers = winningNumbersText.trim().split(/\s+/)
      .map((numberText) => Number(numberText));
    const myNumbers = myNumbersText.trim().split(/\s+/)
      .map((numberText) => Number(numberText));

    const matchedCount = myNumbers.filter((myNumber) => winningNumbers.includes(myNumber)).length;

    return {
      cardId,
      matchedCount,
    };
  });
}
