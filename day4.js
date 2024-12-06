const fs = require('fs');

const data = fs.readFileSync('day4.txt', 'utf8');
console.log(data);

const wordBlock = data.split("\r\n");

//part1
//guess 1 - 2549 - correct!
function wordSearch(block, keyword) {
    //search forward
    //search down
    //search backwards
    //search up

    //search diag NW
    //search diag SW
    //search diag SE
    //search NE

    //track total, increment when successfully found

    //use nested for loops i, j to track position
    //use pointer to track the keyword

    let wordsFound = 0;
    for (let i = 0; i < block.length; i += 1) {
        
        for (let j = 0; j < block[i].length; j += 1) {
            let row = block[i];
            let letter = row[j];
            let keyFirst = keyword[0];
            if (letter === keyFirst) {
                //search forward
                // row[j + 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!row[j + k]) break;
                    if (row[j + k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }


                //search backward
                // row[j - 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!row[j - k]) break;
                    if (row[j - k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }

                //search down
                // block[i + 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i + k]) break;
                    if (block[i + k][j] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }

                //search up
                // block[i - 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i - k]) break;
                    if (block[i - k][j] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }

                //search NE
                // block[i - k][j + k]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i - k]) break;
                    if (block[i - k][j + k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }
            
                //search SE
                // block[i + 1][j + 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i + k]) break;
                    if (block[i + k][j + k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }

                //search SW
                // block[i + 1][j - 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i + k]) break;
                    if (block[i + k][j - k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }

                //search NW
                // block[i - 1][j - 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i - k]) break;
                    if (block[i - k][j - k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        wordsFound += 1;
                    }
                }            
            
            }
        }
    }
    return wordsFound
}

//part2
//guess 1 - 2003 - correct
//upperbound is 5605 (all the MAS found)
function wordSearch2(block, keyword) {
    let wordsFound = 0;
    for (let i = 0; i < block.length; i += 1) {
        
        for (let j = 0; j < block[i].length; j += 1) {
            let row = block[i];
            let letter = row[j];
            let keyFirst = keyword[0];
            if (letter === keyFirst) {
                //search NE
                // block[i - k][j + k]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i - k]) break;
                    if (block[i - k][j + k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        //the first MAS has been found
                        //since we checked NE, we can now check NW or SE (not SW impossible)
                          //will jump two spaces up or two spaces or two spaces forward
                        //NW
                        j += 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i - k]) break;
                            if (block[i - k][j - k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        j -= 2

                        //SE
                        i -= 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i + k]) break;
                            if (block[i + k][j + k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        i += 2
                    }
                }
            
                //search SE
                // block[i + 1][j + 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i + k]) break;
                    if (block[i + k][j + k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        //the first MAS has been found
                        //since we checked SE, we can now check SW or NE (not NW impossible)
                          //will jump two spaces up or two spaces or two spaces forward

                        //SW
                        j += 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i + k]) break;
                            if (block[i + k][j - k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        j -= 2

                        //NE
                        i += 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i - k]) break;
                            if (block[i - k][j + k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        i -= 2
                    }
                }

                //search SW
                // block[i + 1][j - 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i + k]) break;
                    if (block[i + k][j - k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        //the first MAS has been found
                        //since we checked SW, we can now check SW or NW (not NE impossible)
                          //will jump two spaces up or two spaces or two spaces forward

                        //SE
                        j -= 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i + k]) break;
                            if (block[i + k][j + k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        j += 2

                        //NW
                        i += 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i - k]) break;
                            if (block[i - k][j - k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        i -= 2
                    }
                }

                //search NW
                // block[i - 1][j - 1]
                for (let k = 1; k < keyword.length; k += 1) {
                    if (!block[i - k]) break;
                    if (block[i - k][j - k] != keyword[k]) break;
                    if (k === keyword.length - 1) {
                        //the first MAS has been found
                        //since we checked NW, we can now check SW or NE (not SE impossible)
                          //will jump two spaces up or two spaces or two spaces forward

                        //NE
                        j -= 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i - k]) break;
                            if (block[i - k][j + k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        j += 2

                        //SW
                        i -= 2
                        for (let k = 0; k < keyword.length; k += 1) {
                            if (!block[i + k]) break;
                            if (block[i + k][j - k] != keyword[k]) break;
                            if (k === keyword.length - 1) {
                                wordsFound += 1;
                            }
                        }
                        i += 2
                    }
                }            
            
            }
        }
    }
    //divide by 2 to remove double count
    return wordsFound / 2
}


console.log(wordSearch2(wordBlock, "MAS"))