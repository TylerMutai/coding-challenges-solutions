/**
 * A representation of a dictionary in form of a trie.
 */

function AnEntry(word){
  this.word = word;
  const words = [];
  for (let i=0;i <26;i++){
    words.push(null);
  }
  this.words = words;
}

function aDictionary(){

}