import { getSections, MapRange, parseMapSection } from "./utils.ts";
import { min } from "../shared_utils.ts";

function parseSeedSection(seedSection: string): number[] {
  return [...seedSection.matchAll(/(\d+)/g)]
    .map(([, numberText]) => Number(numberText));
}

function buildMapFunction(mapRanges: MapRange[]): (src: number) => number {
  return (src: number): number => {
    const targetMapRange = mapRanges.find((mapRange) =>
      src >= mapRange.start && src < mapRange.end
    );

    return src + (targetMapRange?.delta ?? 0);
  };
}

export default function main(input: string) {
  const [seedSection, ...mapSections] = getSections(input);

  const seeds: number[] = parseSeedSection(seedSection);

  const mapFunctions = mapSections
    .map((mapSection) => parseMapSection(mapSection))
    .map((mapRanges) => buildMapFunction(mapRanges));

  const seedToLocation = mapFunctions.reduce(
    (acc, mapFunction) => (src) => mapFunction(acc(src)),
    (src) => src,
  );

  const locations = seeds.map((seed) => seedToLocation(seed));

  return min(locations);
}
