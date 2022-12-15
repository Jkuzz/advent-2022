// https://adventofcode.com/2022/day/9
const file = await Deno.readTextFile('input.txt')

const instructions = file
  .split('\n')
  .filter((row) => row.length > 0)
  .map((row) => row.split(' '))

const visitedByTail = new Set<string>()
const ropePositions = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
]

const directionVectors = {
  U: [0, 1],
  R: [1, 0],
  D: [0, -1],
  L: [-1, 0],
}

for (const move of instructions) {
  const direction = move[0] as 'U' | 'R' | 'D' | 'L'
  const moveLength = +move[1]

  for (let _i = 0; _i < moveLength; _i += 1) {
    ropePositions[0][0] += directionVectors[direction][0]
    ropePositions[0][1] += directionVectors[direction][1]
    for (let ropeSegIndex = 1; ropeSegIndex < ropePositions.length; ropeSegIndex += 1) {
      ropePositions[ropeSegIndex] = moveRopeSegment(
        ropePositions[ropeSegIndex - 1],
        ropePositions[ropeSegIndex]
      )
    }
    visitedByTail.add(ropePositions[ropePositions.length - 1].join('|'))
  }
}

console.log('Rope length: ', ropePositions.length)
console.log(visitedByTail.size)

function moveRopeSegment(head: number[], tail: number[]) {
  const diff = [head[0] - tail[0], head[1] - tail[1]]
  if (diff[0] > 1) {
    tail = [head[0] - 1, head[1]]
  } else if (diff[0] < -1) {
    tail = [head[0] + 1, head[1]]
  } else if (diff[1] > 1) {
    tail = [head[0], head[1] - 1]
  } else if (diff[1] < -1) {
    tail = [head[0], head[1] + 1]
  }
  return tail
}
