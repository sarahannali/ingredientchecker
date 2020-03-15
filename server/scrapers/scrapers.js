const spawn = require("child_process").spawn;
const mongodb = require("mongodb");

async function runScrapers(requestedIngredients) {
    let scraped_ids;

    const scraperProcess = spawn('python', ["../scrapers/run_scrapers.py",
        requestedIngredients
    ]);

    scraperProcess.stdout.on('data', function (data) {
        console.log(data.toString('utf8'));
        scraped_ids = JSON.parse(data_string).ids.map((el) => mongodb.ObjectID(el));
    });

    let scraperPromise = new Promise((resolve, reject) => {
        scraperProcess.stdout.on('close', function (code) {
            console.log(`scraperProcess exited with code ${code}`);
            resolve()
        });

        setTimeout(function () {
            reject();
        }, 10000)
    });

    await scraperPromise

    return scraped_ids
}

module.exports = {
    runScrapers: runScrapers
}