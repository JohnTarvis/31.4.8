/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }


  /** Pick random choice from array */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};


// function getRandomElement(arr){
//   if(!arr)return '';
//   const relnum = ~~(Math.random() * arr.length);
//   return arr[relnum];
// }

// /** Command-line tool to generate Markov text. */

// /** Textual markov chain generator */
// class MarkovMachine {

//   /** build markov machine; read in text.*/

//   constructor(text) {
//     let words = text.split(/[ \r\n]+/);
//     this.words = words.filter(c => c !== "");
//     this.makeChains();
//   }

//   /** set markov chains:
//    *
//    *  for text of "the cat in the hat", chains will be
//    *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

//   makeChains() {
//     // TODO
//     const chain = new Map();
//     const wordsLength = this.words.length;

//     for(let count = 0; count < this.words.length; count++){
//         const word = this.words[count];
//         chain[word] = [];
//     }

//     let count = 0;
//     for (count = 0; count < wordsLength - 1; count++) {
//       const word = this.words[count];
//       const nextWord = this.words[count + 1];
//       chain[word].push(nextWord);
//     }
//     chain[this.words[count]] = null;
//     this.chain = chain;
//   }


//   /** return random text from chains */

//   makeText(numWords = 100) {

//       const firstWord = getRandomElement(this.words);
  
//       const text = [];
//       text.push(firstWord);
  
//       while (text.length < numWords) {

//           const entries = text.length - 1;
//           const lastWord = text[entries];
//           const nextWords = this.chain[lastWord];
//           // console.log('nextword',nextWords)
//           const nextWord = getRandomElement(nextWords);
//           // console.log('nextword',nextWord);
//           text.push(nextWord);

//       }

//       // console.log('text',text);
//       let textString = '';
//       for (let count = 0; count < text.length; count++) {
//         textString += text[count] + ' ';
//       }
  
//       return textString;
//     }
// }

// module.exports = {
//   MarkovMachine,
// };





