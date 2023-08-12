/**
 *
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 */
function groupAnagrams(strs) {
  const groupsMap = new Map();

  for (const word of strs) {
    const sorted = word.split("").sort().join("");
    console.log("sorted-key", sorted);
    const current = groupsMap.get(sorted) || [];
    current.push(word);
    groupsMap.set(sorted, current);
  }
  console.log("groupsMap", groupsMap);
  return Array.from(groupsMap.values());
}

console.log(groupAnagrams(["a"]));