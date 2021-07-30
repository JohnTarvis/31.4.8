

let path;
let output_file;
let text = false;

let outText = 'nothing...';

function cat(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
        console.log('error', err);
        process.exit(1);
    } else {
        const mm = new markov.MarkovMachine(data);
        outText = mm.makeText();
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    const mm = new markov.MarkovMachine(response.data);
    outText = mm.makeText();
  } catch (err) {
    console.error('url not found');
    process.exit(1);
  }
}

if (process.argv[2] === '--out') {
  output_file = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
//   text = webCat(path);
    webCat(path);
} else {
//   text = cat(path);
    cat(path);
    // console.log(outText + '00000000000000000000');
}

if (!!output_file) {
  fs.writeFile(output_file, text, 'utf8', function (err) {
    if (err) {
      console.error(`error`);
      process.exit(1);
    }
  });
} else {
  console.log('no file');
}
console.log(text);

