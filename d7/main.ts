// https://adventofcode.com/2022/day/7

const file = await Deno.readTextFile('input.txt')

// deno-lint-ignore no-explicit-any
const path: Array<Map<string, any>> = [new Map()]

file
  .split('\n')
  .filter((l) => l.length > 0)
  .forEach((line) => {
    if (line.substring(0, 4) === '$ cd') {
      const dirName = line.split('$ cd ')[1]
      if (dirName === '..') {
        path.pop()
      } else {
        path[path.length - 1].set(dirName, new Map())
        path.push(path[path.length - 1].get(dirName))
      }
    } else if (line.substring(0, 2) != '$ ') {
      const [fileSize, fileName] = line.split(' ')
      if (fileSize != 'dir') {
        path[path.length - 1].set(fileName, +fileSize)
      }
    }
  })

const deleteCandidates: Array<number> = []
const emptySpace = 70000000 - getDirSize(path[0])
const requiredSpace = 30000000 - emptySpace
const dirsToDelete = deleteCandidates.filter((d) => d >= requiredSpace).sort((a, b) => a - b)
console.log('🚀 ~ file: main.ts:33 ~ dirToDelete', dirsToDelete)

// deno-lint-ignore no-explicit-any
function getDirSize(dir: Map<string, any>) {
  let dirSize = 0
  for (const [_name, content] of dir) {
    if (typeof content == 'number') {
      dirSize += content
    } else {
      dirSize += getDirSize(content)
    }
  }
  deleteCandidates.push(dirSize)
  return dirSize
}
