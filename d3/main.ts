// https://adventofcode.com/2022/day/3
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts'

const file = await Deno.open('input.txt')

const GROUP_SIZE = 3
let totalPriority = 0
let elfGroup = []

for await (const line of readLines(file)) {
  elfGroup.push(line)
  if (elfGroup.length < GROUP_SIZE) continue
  let groupDuplicates: Set<string> = new Set(elfGroup.pop())

  for (const elfRucksack of elfGroup) {
    const newDuplicates: Set<string> = new Set()
    for (const rucksackItem of elfRucksack) {
      if (groupDuplicates.has(rucksackItem)) {
        newDuplicates.add(rucksackItem)
      }
    }
    groupDuplicates = newDuplicates
  }

  elfGroup = []

  for (const duplicateItem of groupDuplicates) {
    const priorityOffset = duplicateItem == duplicateItem.toUpperCase() ? 65 - 27 : 96
    const itemPriority = duplicateItem.charCodeAt(0) - priorityOffset
    console.log('🚀 ~ file: main.ts:17 ~ forawait ~ itemPriority', duplicateItem, itemPriority)
    totalPriority += itemPriority
  }
}

console.log(totalPriority)
file.close()
