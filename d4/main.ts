// https://adventofcode.com/2022/day/4

const file = await Deno.readTextFile('input.txt')

const elfGroups = file
  .split('\n')
  .map((group) => group.split(','))
  .filter((group) => group.length >= 2)
  .map((group) => group.map((elf) => elf.split('-')))
  .map((group) => group.map((part) => part.map((n) => +n)))

const groupOverlaps = elfGroups
  .map(
    (group) =>
      (group[0][0] >= group[1][0] && group[0][0] <= group[1][1]) ||
      (group[0][0] <= group[1][0] && group[1][0] <= group[0][1])
  )
  .map((a) => +a)

const overlapsCount = groupOverlaps.reduce((a, b) => a + b, 0)

console.log(overlapsCount)
