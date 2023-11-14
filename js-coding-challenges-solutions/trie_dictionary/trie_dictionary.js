/**
 * A representation of a dictionary in form of a trie.
 */

function TrieEntry(word) {
  this.word = word;
  const words = [];
  for (let i = 0; i < 26; i++) {
    words.push(null);
  }
  this.words = words;
}

function TrieDictionary() {
  const letterToIndexMapping = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5,
    "f": 6,
    "g": 7,
    "h": 8,
    "i": 9,
    "j": 10,
    "k": 11,
    "l": 12,
    "m": 13,
    "n": 14,
    "o": 15,
    "p": 16,
    "q": 17,
    "r": 18,
    "s": 19,
    "t": 20,
    "u": 21,
    "v": 22,
    "w": 23,
    "x": 24,
    "y": 25,
    "z": 26,
  }

  this.root = new TrieEntry();

  this.insertWord = (word) => {
    const wordChars = word.toLowerCase().split("");
    let currWord = "";

    let currSlot = this.root;
    for (const char of wordChars) {
      currWord += char;
      // traverse our root adding each char.
      const idx = letterToIndexMapping[char] - 1;
      const arraySlotForChar = currSlot.words[idx];
      if (arraySlotForChar) {
        currSlot = arraySlotForChar;
      } else {
        currSlot.words[idx] = new TrieEntry(currWord);
        currSlot = currSlot.words[idx];
      }
    }
  }

  this.searchWord = (word) => {
    const wordChars = word.toLowerCase().split("");

    let currSlot = this.root;
    for (const char of wordChars) {
      const idx = letterToIndexMapping[char] - 1;
      const arraySlotForChar = currSlot.words[idx];
      if (!arraySlotForChar) {
        break;
      }
      currSlot = arraySlotForChar;
    }
    return currSlot.word === word;
  }

  this.printDictionary = () => {
    const printRecursively = (entry) => {
      if (!entry) return "";

      for (const en of entry.words) {
        if (en) {
          console.log("en: ", en);
          console.log("--------------------");
        }
        printRecursively(en);
      }
    }

    printRecursively(this.root);
  }

}

function injectWordsToTrie() {
  const words = ["apple", "art", "ant", "and", "sat", "sam", "sand"];
  const trieDict = new TrieDictionary();
  for (const word of words) {
    trieDict.insertWord(word);
  }
  trieDict.printDictionary();

  console.log("Searching Section: ------------");
  console.log(trieDict.searchWord("sand"));
  console.log(trieDict.searchWord("arf"));
}

injectWordsToTrie();