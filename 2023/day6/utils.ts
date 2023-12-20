export type Race = { time: number; distance: number };

export function waysToBeatRecord(race: Race): number {
  // t * (race.time - t) > race.distance
  // => t ** 2 - race.time * t + race.distance < 0
  const [a, b, c] = [1, -race.time, race.distance];

  const det = b ** 2 - 4 * a * c;

  if (det < 0) return 0;

  const [alpha, beta] = [
    ((-b) + Math.sqrt(det)) / 2,
    ((-b) - Math.sqrt(det)) / 2,
  ];

  // number of solutions for integer t
  return Math.ceil(alpha - 1) - Math.floor(beta + 1) + 1;

  // Note: Math.floor(alpha) - Math.ceil(beta) + 1 is wrong
}
