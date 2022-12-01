// https://adventofcode.com/2022/day/1
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts'

const file = await Deno.open('input.txt')

const maxElves: Array<Array<number>> = [[], [], []]
let currentElf: Array<number> = []

for await (const line of readLines(file)) {
  if (line.length == 0) {
    const currentElfValue = currentElf.reduce((accumulator, value) => {
      return +accumulator + +value
    }, 0)

    for (const elfIndex in maxElves) {
      const topElfValue = maxElves[elfIndex].reduce((accumulator, value) => {
        return +accumulator + +value
      }, 0)
      
      if (currentElfValue > topElfValue) {
        maxElves.splice(+elfIndex, 0, currentElf)
        maxElves.splice(3, 1)
        break
      }
    }
    currentElf = []
  } else {
    currentElf.push(+line)
  }
}

console.log(maxElves)

console.log(
  maxElves.flatMap(a => a)
    .reduce((accumulator, value) => {
      return +accumulator + +value
    }, 0)
)

file.close()
