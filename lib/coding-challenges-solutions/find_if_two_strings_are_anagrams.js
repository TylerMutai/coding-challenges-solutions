//  Anagrams - these are words that basically share the same exact characters, but in different order.
// This therefore means that both strings should be of exactly the same length.
function confirmIfStringsAreAnagrams(string1, string2) {
  if (string1.length !== string2.length)
    return false;
  const string1Chars = new Set(string1.split(""));
  const string2Arr = string2.split("");
  for (const s of string2Arr) {
    if (!string1Chars.has(s)) {
      return false;
    }
  }
  return true;
}

console.log(confirmIfStringsAreAnagrams("sadder", "dreads"));