import { getLines } from "../shared_utils.ts";

export type Color = "red" | "green" | "blue";

export const COLORS = ["red", "green", "blue"] as const;

export function parseGames(input: string) {
  const games = getLines(input).map((line) => {
    const [gameIdText, subsetsText] = line.split(": ");

    const [, gameId] = gameIdText.match(/^Game (\d+)$/)!;

    const subsets: Record<Color, number>[] = subsetsText.split("; ").map(
      (subsetText) => {
        const cubes = subsetText.split(", ").map((cubeText) => {
          const [, count, color] = cubeText.match(/^(\d+) (red|green|blue)$/)!;

          return {
            color: color as Color,
            count: Number(count),
          };
        });

        return {
          red: cubes.find((cube) => cube.color === "red")?.count ?? 0,
          green: cubes.find((cube) => cube.color === "green")?.count ?? 0,
          blue: cubes.find((cube) => cube.color === "blue")?.count ?? 0,
        };
      },
    );

    return {
      gameId: Number(gameId),
      subsets,
    };
  });

  return games;
}
