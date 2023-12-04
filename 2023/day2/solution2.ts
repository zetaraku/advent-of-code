import { Color, parseGames } from "./utils.ts";
import { max, sum } from "../shared_utils.ts";

function minimumCubeSet(
  cubeSets: Record<Color, number>[],
): Record<Color, number> {
  return {
    red: max(cubeSets.map((cubeSet) => cubeSet.red)),
    green: max(cubeSets.map((cubeSet) => cubeSet.green)),
    blue: max(cubeSets.map((cubeSet) => cubeSet.blue)),
  };
}

function powerOfCubeSet(cubeSet: Record<Color, number>): number {
  return cubeSet.red * cubeSet.green * cubeSet.blue;
}

export default function main(input: string) {
  const games = parseGames(input);

  return sum(
    games
      .map((game) => game.subsets)
      .map((subsets) => minimumCubeSet(subsets))
      .map((cubeSet) => powerOfCubeSet(cubeSet)),
  );
}
