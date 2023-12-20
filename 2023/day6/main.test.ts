import * as assert from "$std/assert/mod.ts";
import solution1 from "./solution1.ts";
import solution2 from "./solution2.ts";

const input = await Deno.readTextFile(new URL(import.meta.resolve('./input')));

Deno.test(function part1() {
  const output = solution1(input);
  const answer = 500346;
  assert.assertEquals(output, answer);
});

Deno.test(function part2() {
  const output = solution2(input);
  const answer = 42515755;
  assert.assertEquals(output, answer);
});
