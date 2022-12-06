// https://adventofcode.com/2022/day/6

const file = await Deno.readTextFile('input.txt')

const lastChars: Array<string> = []

for (const [index, char] of Object.entries(file)) {
  if (lastChars.length < 14) {
    lastChars.push(char)
    continue
  } else if (new Set(lastChars).size !== lastChars.length) {
    lastChars.shift()
    lastChars.push(char)
    continue
  }
  console.log('Header ends at', index)
  break
}
