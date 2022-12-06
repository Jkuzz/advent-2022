// https://adventofcode.com/2022/day/5

const file = await Deno.readTextFile('input.txt')

const [initialState, crateMovesInput] = file.split('\n\n')
const inputRows = initialState.split('\n').reverse()

const crateStacks: Array<Array<string>> = inputRows[0].split('  ').map((_) => [])
inputRows.slice(1).forEach((row) => {
  row
    .replaceAll('    ', ' ')
    .split(' ')
    .forEach((crate, i) => {
      if (crate.length == 0) return
      crateStacks[i].push(crate[1])
    })
})

crateMovesInput.split('\n').forEach((moveInput) => {
  const moveCommand = moveInput
    .split(/move | from | to /)
    .slice(1) // Remove empty str from the start
    .map((a) => +a) // to number
  if (moveCommand.length !== 3) return // ignore unfit lines

  const cratesToMove = []
  for (let i = 0; i < moveCommand[0]; i += 1) {
    cratesToMove.push(crateStacks[moveCommand[1] - 1].pop())
  }
  cratesToMove
    .reverse()
    .forEach((crate) => crateStacks[moveCommand[2] - 1].push(crate || ' ERROR '))
})

let output = ''
crateStacks.forEach((stack) => (output += stack.pop()))
console.log(output)
