const spawn = require("child_process").spawn;
const mongodb = require("mongodb");

async function runScrapers(requestedIngredients) {
    let scraped_ids;

    const cosDNAProcess = spawn('python', ["../scrapers/cosDNA_ingredient_checker.py",
        requestedIngredients
    ]);

    const INCIProcess = spawn('python', ["../scrapers/inci_ingredient_checker.py",
        requestedIngredients
    ]);

    const veganProcess = spawn('python', ["../scrapers/vegan_ingredient_checker.py",
        requestedIngredients
    ]);

    cosDNAProcess.stdout.on('data', function (data) {
        console.log(data.toString('utf8'));
    });

    INCIProcess.stdout.on('data', function (data) {
        console.log(data.toString('utf8'));
    });

    veganProcess.stdout.on('data', function (data) {
        data_string = data.toString('utf8');
        scraped_ids = JSON.parse(data_string).ids.map((el) => mongodb.ObjectID(el));
    });

    let cosPromise = new Promise((resolve, reject) => {
        cosDNAProcess.stdout.on('close', function (code) {
            console.log(`cosDNA process exited with code ${code}`);
            resolve()
        });

        setTimeout(function () {
            reject();
        }, 10000)
    });

    let inciPromise = new Promise((resolve, reject) => {
        INCIProcess.stdout.on('close', function (code) {
            console.log(`INCI process exited with code ${code}`);
            resolve()
        });

        setTimeout(function () {
            reject();
        }, 10000)
    });

    let veganPromise = new Promise((resolve, reject) => {
        veganProcess.stdout.on('close', function (code) {
            console.log(`vegan process exited with code ${code}`);
            resolve()
        });

        setTimeout(function () {
            reject();
        }, 10000)
    });

    await Promise.all([cosPromise, inciPromise, veganPromise]);

    return scraped_ids
}

module.exports = {
    runScrapers: runScrapers
}