const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err.message}`);
            process.exit(1);
        } else {
            console.log(data)
        }
    })
}
cat(process.argv[2])

async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
    }
}
webCat(process.argv[3])