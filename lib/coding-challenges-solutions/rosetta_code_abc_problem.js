const blocks = [
  ['B', 'O'],
  ['X', 'K'],
  ['D', 'Q'],
  ['C', 'P'],
  ['N', 'A'],
  ['G', 'T'],
  ['R', 'E'],
  ['T', 'G'],
  ['Q', 'D'],
  ['F', 'S'],
  ['J', 'W'],
  ['H', 'U'],
  ['V', 'I'],
  ['A', 'N'],
  ['O', 'B'],
  ['E', 'R'],
  ['F', 'S'],
  ['L', 'Y'],
  ['P', 'C'],
  ['Z', 'M']
]

function canMakeWord(word) {
  const blocksMap = new Map();
  for (let i = 0; i < blocks.length; i++) {
    blocksMap.set(i, blocks[i]);
  }

  const wordChars = word.toUpperCase().split("");
  for (const char of wordChars) {
    let canMakeWord = false;
    for (const block of blocksMap) {
      const key = block[0];
      const blockArr = block[1]

      if (blockArr.includes(char)) {
        canMakeWord = true;
        blocksMap.delete(key)
        break;
      }
    }
    if (!canMakeWord) {
      return false;
    }
  }
  return true
}

console.log(canMakeWord("BooK"))