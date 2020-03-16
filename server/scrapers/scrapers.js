const spawn = require("child_process").spawn;
const mongodb = require("mongodb");

async function runScrapers(requestedIngredients) {
    let scraped_objects;

    const scraperProcess = spawn('python', ["../scrapers/run_scrapers.py",
        requestedIngredients
    ]);

    scraperProcess.stdout.on('data', function (data) {
        const data_string = data.toString('utf8')
        scraped_objects = JSON.parse(data_string)
    });

    let scraperPromise = new Promise((resolve, reject) => {
        scraperProcess.stdout.on('close', function (code) {
            console.log(`scraperProcess exited with code ${code}`);
            resolve()
        });

        setTimeout(function () {
            console.log('timeout')
            reject();
        }, 5000)
    });

    await scraperPromise

    return scraped_objects
}

module.exports = {
    runScrapers: runScrapers
}