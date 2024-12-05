const fs = require('fs');

const data = fs.readFileSync('day1.txt', 'utf8');
console.log(data);

const lines = data.trim().split('\r\n');
let listA = [];
let listB = [];
let sumA = 0;
let sumB = 0

let obj = {}
lines.forEach((line) => {
    let val = line.split("   ");
    listA.push(Number(val[0]))
    listB.push(Number(val[1]))
    if (obj[val[1]]) {
        obj[val[1]] += 1
    } else {
        obj[val[1]] = 1
    }
});

//not correct = 877009


listA.sort();
listB.sort();

//part1
// let diffSum = 0;

// for (let i = 0; i < listA.length; i += 1) {
//     diffSum += Math.abs(listA[i] - listB[i]);
// }
//1590491 - correct

let similar = 0;
//part2
for (let i = 0; i < listA.length; i += 1) {
    if (obj[listA[i]]) {
        similar += listA[i] * obj[listA[i]];
    }
}

console.log("similar: ", similar);


