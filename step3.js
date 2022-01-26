const fs = require('fs');
const axios = require('axios');
const process = require('process');

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, "utf8", (err) => {
            if (err) {
                console.log(`Couldn't write ${out}: ${err.message}`);
                process.exit(1);
            }
        });

    } else {
        console.log(text)
    }
}

function cat(path, out) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err.message}`);
            process.exit(1);
        } else {
            handleOutput(data, out)
        }
    })
}


async function webCat(url, out) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, out);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
    }
}

let path;
let out;

if (process.argv[2] === "--out") {
    out = process.argv[3];
    path = process.argv[4];

} else {
    path = process.argv[2]
}

if (path.slice(0, 4) === "http") {
    webCat(path, out);

} else {

    cat(path, out);
}