(async function init(){

    const fs = require('fs');
    const axios = require('axios');
  
    let path;
    let output_file;
    let text = false;
  
    if(process.argv[2] === '--out') {
        output_file = process.argv[3];
        path = process.argv[4];
    }else{
        path = process.argv[2];
    }
  
    if(path.slice(0, 4) === 'http') {
      try{
        let response = await axios.get(url);
        text = response.data;
      } catch (err){
        console.error('url not found');
        process.exit(1);
      }
    } else {
      fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.error('error ',err);
            process.exit(1);
        } else {
            text = data;
            // console.log('original',text);
        }
      });
    }
  
    if(text){
      const markovMachine = new MarkovMachine(text);
      const output = markovMachine.makeText();
      text = output;
      console.log('markoved',text);
    }
  
    if(!!output_file) {
      fs.writeFile(output_file, text, 'utf8', function(err) {
        if(err) {
            console.error(`error`);
            process.exit(1);
        }
      });
    }else{
      console.log('no file');
    }
    console.log(text);
  
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
        // TODO
        const chain = new Map();
        const wordsLength = this.words.length;
        let count = 0;
        for (count = 0; count < wordsLength - 1; count++) {
          const word = this.words[count];
          const nextWord = this.words[count + 1];
          const tail = chain[word];
          tail.push(nextWord);
        }
        chain[this.words[count]] = null;
        this.chain = chain;
      }
  
  
      /** return random text from chains */
  
      makeText(numWords = 100) {
        // TODO
        ///-pick a random word but avoid the last word to prevent getting null on the next go
        const randomWordNumber = Math.floor(Math.random(this.words.length - 1));
        const firstWord = this.words[randomWordNumber];
  
        const text = [firstWord];
  
        while (text.length < numWords) {
          const nextWords = chain[text[text.length - 1]];///-get the last item in text
          randomWordNumber = Math.floor(Math.random(nextWords.length));
          const nextWord = nextWords[randomWordNumber];
          text.push(nextWord);
        }
  
        let textString = '';
  
        for(let count = 0; count < text.length; count++){
          textString += text[count] + ' ';
        }
  
        // console.log('text',textString);
  
        return textString;
      }
    }
  })();