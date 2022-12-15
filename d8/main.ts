// https://adventofcode.com/2022/day/7

const file = await Deno.readTextFile('input.txt')

let rows = file
  .split('\n')
  .filter((row) => row.length > 0)
  .map((row) => row.split(''))
  .map((row) => row.map((tree) => +tree))
console.log('🚀 ~ file: main.ts:9 ~ rows', rows)

let visibleTrees = findVisibleTrees(rows)
for (let i = 0; i < 3; i += 1) {
  rows = rotateMatrixClockwise(rows)
  visibleTrees = rotateMatrixClockwise(visibleTrees)
  const visibleTreesThisSide = findVisibleTrees(rows)

  for (let i = 0; i < visibleTreesThisSide.length; i++) {
    const row = visibleTreesThisSide[i]
    for (let j = 0; j < row.length; j++) {
      const visibleTree = row[j]
      visibleTrees[i][j] = +(visibleTree > 0 || visibleTrees[i][j] > 0)
    }
  }
}

console.log(visibleTrees)
const totalVisible = visibleTrees.reduce((a, b) => a + b.reduce((c, d) => c + d), 0)
console.log(totalVisible)

function findVisibleTrees(rows: Array<Array<number>>) {
  const visibleRows = []
  for (const row of rows) {
    const visibleRow = []
    let maxInRow = -1
    for (const tree of row) {
      if (tree > maxInRow) {
        visibleRow.push(1)
        maxInRow = tree
      } else {
        visibleRow.push(0)
      }
    }
    visibleRows.push(visibleRow)
  }
  return visibleRows
}

function rotateMatrixClockwise(matrix: Array<Array<number>>) {
  return matrix[0].map((_val, index) => matrix.map((row) => row[index]).reverse())
}
