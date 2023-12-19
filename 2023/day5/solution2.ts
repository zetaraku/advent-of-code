import { getSections, MapRange, parseMapSection, Range } from "./utils.ts";
import { min, pairs } from "../shared_utils.ts";

function parseSeedSection(seedSection: string): Range[] {
  return [...seedSection.matchAll(/(\d+) (\d+)/g)]
    .map(([, rangeStartText, rangeLengthText]) => ({
      start: Number(rangeStartText),
      end: Number(rangeStartText) + Number(rangeLengthText),
    }));
}

function augmentMapRanges(mapRanges: MapRange[]): MapRange[] {
  const orderedMapRanges = mapRanges.toSorted((a, b) => a.start - b.start);

  return orderedMapRanges.length > 0 ? [
    {
      start: -Infinity,
      end: orderedMapRanges.at(0)!.start,
      delta: 0,
    },
    ...pairs(orderedMapRanges).flatMap(([currentMapRange, nextMapRange]) => [
      currentMapRange,
      ...(nextMapRange.start > currentMapRange.end ? [{
        start: currentMapRange.end,
        end: nextMapRange.start,
        delta: 0,
      }] : [])
    ]),
    orderedMapRanges.at(-1)!,
    {
      start: orderedMapRanges.at(-1)!.end,
      end: +Infinity,
      delta: 0,
    },
  ] : [
    {
      start: -Infinity,
      end: +Infinity,
      delta: 0,
    },
  ];
}

function buildMapFunction(mapRanges: MapRange[]): (srcRange: Range) => Range[] {
  const augmentedMapRanges: MapRange[] = augmentMapRanges(mapRanges);

  return (srcRange: Range): Range[] => {
    return augmentedMapRanges
      .filter((mapRange) => {
        const isNotOverlapped = (mapRange.start >= srcRange.end) || (mapRange.end <= srcRange.start);

        return !isNotOverlapped;
      })
      .map((mapRange) => {
        const overlappedRange = {
          start: Math.max(mapRange.start, srcRange.start),
          end: Math.min(srcRange.end, mapRange.end),
        };

        return {
          start: overlappedRange.start + mapRange.delta,
          end: overlappedRange.end + mapRange.delta,
        };
      });
  };
}

export default function main(input: string) {
  const [seedSection, ...mapSections] = getSections(input);

  const seedRanges: Range[] = parseSeedSection(seedSection);

  const mapFunctions = mapSections
    .map((mapSection) => parseMapSection(mapSection))
    .map((mapRanges) => buildMapFunction(mapRanges));

  const seedRangeToLocationRanges = mapFunctions.reduce(
    (acc, mapFunction) => {
      return (srcRange) => acc(srcRange).flatMap((destRange) => mapFunction(destRange));
    },
    (srcRange) => [srcRange],
  );

  const locationRanges = seedRanges.flatMap((seedRange) => seedRangeToLocationRanges(seedRange));

  return min(locationRanges.map((locationRange) => locationRange.start));
}
