// https://adventofcode.com/2022/day/1

const file = await Deno.readTextFile('input.txt')

const allElves = file
  .split('\n\n')
  .map((elf) => elf.split('\n'))

const elfSums = allElves.map((elf) => elf.reduce((a, b) => a + +b, 0))

const topElves = elfSums.sort((a, b) => b-a).slice(0, 3)
console.log(topElves.reduce((a, b) => a + b, 0))
