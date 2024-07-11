/**
 * Given an array of strings strs, group the anagrams together. You can return the answer in any
 * order.
 */

function anagrams(words){
  return anagrams1(words);
}

/**
 * For every loop, we sort the words first, then add them to a map.
 * @param words
 */
function anagrams1(words){
  const now = new Date().getTime();
  const groupedWords = new Map();
  for (const word of words){
    const chars = word.split("");
    const sortedChars = chars.sort((a, b) => a.localeCompare(b))
    const sortedWord = sortedChars.join("");
    const arr = groupedWords.get(sortedWord) || [];
    arr.push(word);
    groupedWords.set(sortedWord,arr);
  }

  const wordArr = [];
  const keys = Array.from(groupedWords.keys());
  console.log("KEYS: ", keys);
  for (const k of keys){
    wordArr.push(groupedWords.get(k));
  }

  console.log(`Ending algorithm. It took approx. ${(new Date().getTime() - now)/1000} seconds.`);
  return wordArr;
}


console.log(anagrams(["eat","tea","tan","ate","nat","bat"]));