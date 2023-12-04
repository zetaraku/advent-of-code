import { Color, COLORS, parseGames } from "./utils.ts";
import { sum } from "../shared_utils.ts";

export default function main(input: string) {
  const bag: Record<Color, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = parseGames(input);

  const validGames = games.filter((game) =>
    game.subsets.every((subset) =>
      COLORS.every((color) => subset[color] <= bag[color])
    )
  );

  return sum(validGames.map((game) => game.gameId));
}
