/** Command-line tool to generate Markov text. */


const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}


/** read file and generate text from it. */

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


/** read URL and make text from it. */


async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}


/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}


// let path;
// let output_file;
// let text = false;

// let outText = 'nothing...';

// function cat(path) {
//   fs.readFile(path, 'utf8', function (err, data) {
//     if (err) {
//         console.log('error', err);
//         process.exit(1);
//     } else {
//         const mm = new markov.MarkovMachine(data);
//         outText = mm.makeText();
//     }
//   });
// }

// async function webCat(url) {
//   try {
//     let response = await axios.get(url);
//     const mm = new markov.MarkovMachine(response.data);
//     outText = mm.makeText();
//   } catch (err) {
//     console.error('url not found');
//     process.exit(1);
//   }
// }

// if (process.argv[2] === '--out') {
//   output_file = process.argv[3];
//   path = process.argv[4];
// } else {
//   path = process.argv[2];
// }

// if (path.slice(0, 4) === 'http') {
// //   text = webCat(path);
//     webCat(path);
// } else {
// //   text = cat(path);
//     cat(path);
//     // console.log(outText + '00000000000000000000');
// }

// if (!!output_file) {
//   fs.writeFile(output_file, text, 'utf8', function (err) {
//     if (err) {
//       console.error(`error`);
//       process.exit(1);
//     }
//   });
// } else {
//   console.log('no file');
// }
// console.log(text);

