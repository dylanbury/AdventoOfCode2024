const fs = require('fs');

const data = fs.readFileSync('day2.txt', 'utf8');
console.log(data);

let _levels = data.split("\r\n");
let levels = [];

_levels.forEach((lvl) => {
    levels.push(lvl.split(" ").map((num) => Number(num)))
})

//part1
//guess1 598 is low
//guess2 691 is high
//guess3 606 is correct -- needed strings to be numbers in the arrays
function checkLevels(lvlsArray) {
    let safeCount = 0
    let badLevels = [];
    for (let level of lvlsArray) {
        let safe = true;
        for (let i = 2; i < level.length; i += 1) {
            //check if lvl is increasing or decreasing
            //check if previous value is 1,2,3
                //continue if false
            
            if (level[0] === level[1]) {
                safe = false;
                break;
            };
            //decreasing
            if (level[0] > level[1]) {
                if (!within3(level[0],level[1])) {
                    safe = false;
                    break;
                }; 
                if (!within3(level[i-1],level[i])) {
                    safe = false;
                    break;
                };
            } else {
                
                //increasing
                // console.log("increasing")
                if (!within3(level[1],level[0])) {
                    safe = false;
                    break;
                }; 
                if (!within3(level[i],level[i-1])) {
                    safe = false;
                    break;
                };
            }
        }
        // console.log(level, " safe: ", safe)
        if (safe) {
            safeCount += 1;
        }
    }

    return safeCount;
}

function within3(a,b) {
    return ((a - b) === 1 || (a - b) === 2 || (a - b) === 3)
}

//part2
//guess1 - 636 -- too low
//guess2 - 644 -- correct. brute force was the best way
function checkLevels2(lvlsArray) {
    let safeCount = 0
    let badLevels = [];
    for (let level of lvlsArray) {
        let safe = true;
        let badIndex = 0;
        for (let i = 1; i < level.length; i += 1) {
            //check if lvl is increasing or decreasing
            //check if previous value is 1,2,3
                //continue if false
            
            if (level[0] === level[1]) {
                safe = false;
                break;
            };
            //decreasing
            if (level[0] > level[1]) {
                if (!within3(level[0],level[1])) {
                    safe = false;
                    break;
                }; 
                if (!within3(level[i-1],level[i])) {
                    safe = false;
                    badIndex = i;
                    break;
                };
            } else {
                
                //increasing
                // console.log("increasing")
                if (!within3(level[1],level[0])) {
                    safe = false;
                    break;
                }; 
                if (!within3(level[i],level[i-1])) {
                    safe = false;
                    badIndex = i;
                    break;
                };
            }
        }
        // console.log(level, " safe: ", safe)
        if (safe) {
            safeCount += 1;
        } else {
            // console.log("bad index: ", badIndex)
            let levelA = [...level];
            let levelZ = [...level];
            // let levelB = [...level];

            if (badIndex !== 0) {
                badIndex += 1
            }
            levelA.splice(badIndex, 1)

            badLevels.push(level)

            // console.log(levelA)
            // console.log(levelB)
            // console.log(levelZ)
        }
    }

    let oneBadLevelCount = 0;
    for (let level of badLevels) {

        let safeLevel = false;
        for (let j = 0; j < level.length; j += 1) {
            if (safeLevel) break;
            let levelAdjusted = [...level];
            levelAdjusted.splice(j, 1);
            let safe = true;
            for (let i = 2; i < levelAdjusted.length; i += 1) {            
                if (levelAdjusted[0] === levelAdjusted[1]) {
                    safe = false;
                    break;
                };
                //decreasing
                if (levelAdjusted[0] > levelAdjusted[1]) {
                    if (!within3(levelAdjusted[0],levelAdjusted[1])) {
                        safe = false;
                        break;
                    }; 
                    if (!within3(levelAdjusted[i-1],levelAdjusted[i])) {
                        safe = false;
                        break;
                    };
                } else {
                    //increasing
                    if (!within3(levelAdjusted[1],levelAdjusted[0])) {
                        safe = false;
                        break;
                    }; 
                    if (!within3(levelAdjusted[i],levelAdjusted[i-1])) {
                        safe = false;
                        break;
                    };
                }
            }
            // console.log(level, " safe: ", safe)
            if (safe) {
                oneBadLevelCount += 1;
                safeLevel = true;
            }
        }

    }
    

    return safeCount + oneBadLevelCount;
}

console.log(checkLevels2(levels));


