const fs = require('fs');

const data = fs.readFileSync('day3.txt', 'utf8');
console.log(data);

/* 
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];

console.log(array[0]);
// Expected output: Array ["test1", "e", "st1", "1"]

console.log(array[1]);
// Expected output: Array ["test2", "e", "st2", "2"]
*/

//part1
//guess1 - 170068701 -- correct!

function parseCorruptedMemory(mem) {
    const regexp = /mul\(\d{1,3},\d{1,3}\)/g;

    const array = [...mem.match(regexp)];
    let total = 0;
    for (let i = 0; i < array.length; i += 1) {
        let mul = array[i].split("mul(").join("").split(")").join("").split(",")
        total += mul[0] * mul[1]
    }
    return total
}

//part2
//guess1 - 78683433 -- correct!
function parseCorruptedMemory2(mem) {
    const regexp = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)/g;

    const array = [...mem.match(regexp)];
    console.log("array: ", array)
    let total = 0;
    let enabled = true;
    for (let i = 0; i < array.length; i += 1) {
        if (array[i] === "do()") {
            enabled = true;
            continue;
        } else if (array[i] === "don't()") {
            enabled = false;
            continue;
        }
        if (enabled) {
            let mul = array[i].split("mul(").join("").split(")").join("").split(",")
            total += mul[0] * mul[1]
        }
    }
    return total
}

console.log(parseCorruptedMemory2(data))