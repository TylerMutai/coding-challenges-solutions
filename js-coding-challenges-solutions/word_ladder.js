/**
 * A transformation sequence from word beginWord to word endWord using a dictionary wordList is a
 * sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
 *
 * Every adjacent pair of words differs by a single letter.
 * Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
 * sk == endWord
 *
 * Given two words, beginWord and endWord, and a dictionary wordList, return the number
 * of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
 * @param beginWord
 * @param endWord
 * @param wordList
 */
function wordLadder(beginWord, endWord, wordList) {

  // Solution - Build an adjacency list which will represent each node and it's edges.
  // Use Breadth-First algorithm to find the shortest path to [endWord]
  // We also include the [beginWord] in our wordList set.
  wordList = [beginWord, ...wordList]
  const wordListSet = new Set(wordList);

  if (!wordListSet.has(endWord)) {
    return 0;
  }

  // let's build our adjacency list by using the word patterns. I.e:
  // if hit, patterns are -> [*it], [h*t], [hi*] and so on.
  const patternList = new Map();
  for (const word of wordList) {
    const patterns = getWordPatterns(word);

    // inject each pattern to our [patternList]
    for (const pattern of patterns) {
      const existingList = patternList.get(pattern) || [];
      existingList.push(word);
      patternList.set(pattern, existingList);
    }
  }

  // now let's loop through our pattern list and build nodes with their neighbours.
  const adjacencyList = new Map();
  for (const words of Array.from(patternList.values())) {
    for (const word of words) {
      const neighbours = adjacencyList.get(word) || new Set();
      const otherWords = getOtherWords(word, words);
      for (const w of otherWords) {
        neighbours.add(w);
      }
      adjacencyList.set(word, neighbours);
    }
  }

  console.log(adjacencyList)
  // if all words don't have neighbours, then return 0.
  let currentSize = 0;
  for (const neighbours of adjacencyList.values()) {
    if (neighbours.size > currentSize) {
      currentSize = neighbours.size;
    }
  }
  if (currentSize === 0) {
    return currentSize;
  }

  // if [beginWord] and [endWord] have no neighbours, then it's not possible to convert this.
  if ((adjacencyList.get(beginWord)).size === 0) {
    return 0;
  }

  if ((adjacencyList.get(endWord)).size === 0) {
    return 0;
  }

  const traversedWords = new Set([beginWord]);
  const traversalQueue = [beginWord];
  let currentDepth = 1;

  while (traversalQueue.length > 0) {
    // get [currentWord] neighbours, and store them
    for (const word of traversalQueue) {
      const currentWord = traversalQueue.shift();
      if (currentWord === endWord) {
        console.log("traversedWords", traversedWords)
        return currentDepth;
      }
      const neighbours = Array.from(adjacencyList.get(currentWord) || new Set());
      for (const n of neighbours) {
        if (!traversedWords.has(n)) {
          traversedWords.add(n);
          traversalQueue.push(n);
        }
      }
    }
    currentDepth++;
  }
  console.log("traversedWords", traversedWords)
  return currentDepth;
}

function getOtherWords(word, words) {
  const otherWords = [];
  for (const w of words) {
    if (w !== word) {
      otherWords.push(w);
    }
  }
  return otherWords;
}

function getWordPatterns(word) {
  const patterns = [];
  for (let i = 0; i < word.length; i++) {
    patterns.push(
      word.substring(0, i) + "*" + word.substring(i + 1)
    );
  }
  return patterns;
}

// console.log("Answer: ", wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]))
// console.log("Answer: ", wordLadder("hot", "dog", ["hot", "dog",]))
// console.log("Answer: ", wordLadder("hot", "dog", ["hot", "dog", "dot"]))
// console.log("Answer: ", wordLadder("red", "tax", ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"]))
// console.log("Answer: ", wordLadder("talk", "tail", ["talk", "tons", "fall", "tail", "gale", "hall", "negs"]))
console.log("Answer: ", wordLadder("hit", "cog", ["hot", "dot", "tog", "cog"]))