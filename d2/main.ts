// https://adventofcode.com/2022/day/2
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts'

const file = await Deno.open('input.txt')

const intents = {
  X: 'loses',
  Y: 'draws',
  Z: 'beats',
}

function getMyShapeFromIntent(elfMove: keyof typeof shapes.X, intent: keyof typeof shapes) {
  for (const shape of Object.values(shapes)) {
    const shapeIntentTargets = shape[intents[intent]]
    if (shapeIntentTargets.includes(elfMove)) return shape
  }
}

const shapes = {
  X: {
    points: 1,
    beats: ['C'],
    draws: ['A'],
    loses: ['B'],
  },
  Y: {
    points: 2,
    beats: ['A'],
    draws: ['B'],
    loses: ['C'],
  },
  Z: {
    points: 3,
    beats: ['B'],
    draws: ['C'],
    loses: ['A'],
  },
}

const winPoints = 6
const drawPoints = 3
const lostPoints = 0

let myPoints = 0

for await (const line of readLines(file)) {
  const [elfMove, myIntent] = line.split(' ')
  const myShape = getMyShapeFromIntent(elfMove, myIntent)
  if(!myShape) continue
  myPoints += myShape.points

  if (myShape.beats.includes(elfMove)) {
    myPoints += winPoints
  } else if (myShape.draws.includes(elfMove)) {
    myPoints += drawPoints
  } else {
    myPoints += lostPoints
  }
}

console.log(myPoints)
file.close()
