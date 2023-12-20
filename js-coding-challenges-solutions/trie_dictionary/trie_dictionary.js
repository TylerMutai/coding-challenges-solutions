/**
 * A representation of a dictionary in form of a trie.
 */
const wordsDictionary = require("./words_reader");

export function TrieEntry(word) {
  this.word = word;
  const words = [];
  for (let i = 0; i < 26; i++) {
    words.push(null);
  }
  this.words = words;
}

export function TrieDictionary() {
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
  const now = new Date();
  console.log(`Dictionary population (${wordsDictionary.length} words) timestamp start: `, now.getTime());
  const trieDict = new TrieDictionary();
  for (const word of wordsDictionary) {
    trieDict.insertWord(word);
  }
  const now2 = new Date();
  console.log("Timestamp after population: ", now2.getTime());
  console.log("Number of seconds elapsed: ", (now2.getTime() - now.getTime()) / 1000);
  console.log("------------------------------------------------------------")

  const wordsToSearch = ["a", "aa", "aaa", "aaaa", "aaacn", "aaah", "aaai", "aaas", "aab", "zzzz", "rewriting",
    "rewritten", "rewrote", "rex", "rexburg", "roxburgh",
    "roxburghshire", "roxbury", "roxen", "roxette", "roxie", "roxio", "tilapia", "tilburg", "tilbury",
    "tilda", "tilde", "tilden", "tile", "tiled", "tiles", "tilghman", "tilia", "tiling", "till", "tillage",
    "tillamook", "tilled", "tiller", "tillers", "tilley", "tillie", "tilling", "tillis", "tillman", "tillotson",
    "tillsonburg", "tilly", "tilman", "tilson", "tilt", "tilted", "tilting", "caidoz", "Zionism",
    "msinoiZ", "Zionism1", "1msinoiZ", "Zip", "piZ", "Zip1", "1piZ", "Zipping", "gnippiZ", "Zipping1", "1gnippiZ",
    "Zircon", "nocriZ", "Zircon1", "1nocriZ", "Zirconiu", "uinocriZ", "Zloty", "ytolZ", "Zodiac", "caidoZ", "1gnippiz",
    "zircon", "nocriz", "zircon1", "1nocriz", "zirconiu", "uinocriz", "zloty", "ytolz", "zodiac", "caidoz",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff",
    "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff", "caidozzzzdff"
  ];

  // duplicate the [wordsToSearch] array n*n times.
  for (let i = 0; i < 5; i++) {
    wordsToSearch.push(...wordsToSearch);
  }

  console.log("Length (n) of words to search: ", wordsToSearch.length);
  console.log("------------------------------------------------------------")

  const searchLinearNow = new Date();
  console.log("Linear Searching timestamp start: ", searchLinearNow.getTime());
  for (const word of wordsToSearch) {
    let match = false;
    for (const w of wordsDictionary) {
      if (w === word) {
        match = true;
        break;
      }
    }
  }
  console.log("Linear Searching total seconds elapsed: ", (new Date().getTime() - searchLinearNow.getTime()) / 1000);
  console.log("-----------------------------------------------------------");
  console.log("-----------------------------------------------------------");

  const searchDictionaryNow = new Date();
  console.log("Dictionary (Trie) Searching timestamp start: ", searchDictionaryNow.getTime());
  for (const word of wordsToSearch) {
    trieDict.searchWord(word);
  }
  console.log("Dictionary (Trie) Searching total seconds elapsed: ", (new Date().getTime() - searchDictionaryNow.getTime()) / 1000);
  console.log("-----------------------------------------------------------");
  console.log("-----------------------------------------------------------");
}

injectWordsToTrie();