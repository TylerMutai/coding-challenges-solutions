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
  const wordListSet = new Set(Array.from(wordList));

  // insert the endWord to the set
  wordListSet.add(endWord);

  let wordsToInvestigateQueue = new Set([beginWord])
  let numberOfWords = 0;

  while (wordsToInvestigateQueue.size > 0) {
    const arrOfWords = Array.from(wordsToInvestigateQueue);
    let currentWord = arrOfWords.shift()
    wordsToInvestigateQueue = new Set(arrOfWords.values());
    numberOfWords++;
    const chars = currentWord.split("");
    for (let i = 0; i < chars.length; i++) {
      // get all possible combinations of char
      const words = allPossibleCombinationsOfChar(i, chars.join(""))
      for (const word of words) {
        if (wordListSet.has(word)) {
          wordsToInvestigateQueue.add(word);
        }
      }
    }
    if (wordsToInvestigateQueue.has(endWord)) {
      break;
    }
    console.log("currentWord", currentWord);
    console.log("numberOfWords", numberOfWords);
    console.log("wordsToInvestigateQueue", wordsToInvestigateQueue);
  }
}

function allPossibleCombinationsOfChar(index, chars) {
  const alphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
  const alphabetArray = alphabet.split(",");

  const words = new Set();
  for (const alphabet of alphabetArray) {
    const word = chars.substring(0, index) + alphabet + chars.substring(index + 1);
    words.add(word)
  }
  return Array.from(words.values());
}

wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])