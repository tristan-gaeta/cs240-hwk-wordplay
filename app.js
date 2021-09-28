let sixLetterIndices = [];
for(let i = 0; i < dictionary.length; i++){
    if (dictionary[i].length == 6){
        sixLetterIndices.push(i);
    }
    else if (dictionary[i].length > 6 || dictionary[i].length < 3){
        dictionary.splice(i,1);
        i--;
    }
}

let randomIndex = Math.floor(Math.random()*sixLetterIndices.length);
play(dictionary[sixLetterIndices[randomIndex]]);

function play(root){
    
    const rootWord = root;
    let sub_words = find_sub_words_for(rootWord);
    let word_status = sub_words.map(function (_){
        return false;
    });
    let shuffleRoot = shuffleWord(rootWord);

    let winStatus = false;
    let numCorrect = 0;

    printGame(`Availiable letters: ${shuffleRoot}`,sub_words,word_status);
    let input = prompt(`Guess a word:`);

    while (input != null && !(input.toLocaleUpperCase() === `CANCEL`)){
        if(input == `*`){
            shuffleRoot = shuffleWord(shuffleRoot);
        }else if(input.length < 3){
            alert(`That word is too short.`);
        }else if(input.length > 6){
            alert(`That word is too long.`);
        }else{  //valid entry
            let index = sub_words.indexOf(input)
            if (index != -1){
                if(word_status[index]){
                    alert(`You've already found "${input}".`);
                }else{
                    alert(`Correct!`);
                    word_status[index] = true;
                    numCorrect++;
                }
            }else{
                alert(`"${input}" is not a valid word.`);
            }
        }

        printGame(`Availiable letters: ${shuffleRoot}`,sub_words,word_status);

        if(numCorrect == sub_words.length){
            winStatus = true;
            break;
        }

        input = prompt('Guess a word:');
    }

    if(winStatus){
        alert(`Congratulations! You guessed all ${sub_words.length} words!`);
    }else{
        word_status = sub_words.map(function (_){
            return true;
        });
    }
    printGame(`You guessed ${numCorrect} out of ${sub_words.length} words!`,sub_words,word_status);
}

function printGame(head,sub_words,word_status){
    console.clear();
    out = head + `\n`
    for (let i = 0; i < sub_words.length; i++){
        if (word_status[i]){
            out += sub_words[i]+`\n`;
        }else{
            log = `-`;
            out += log.repeat(sub_words[i].length)+`\n`;
        }
    }
    console.log(out);
}

function shuffleWord(inStr){
    if (inStr.length == 1){
        return inStr;
    }
    let chars = inStr.split(``);
    let randIndex = Math.floor(chars.length * Math.random());
    let randChar = chars[randIndex];
    inStr = inStr.replace(randChar,``);
    return randChar+shuffleWord(inStr);
}

function find_sub_words_for(rootWord){
    let out = []
    for(let d of dictionary){
        let root = rootWord;
        let i = 0;
        while(true){
            let prevRoot = root;
            root = root.replace(d.charAt(i),'')
            if (root == prevRoot){
                break;
            }
            i++;
            if (i == d.length){
                out.push(d);
                break;
            }
        }
    }
    return out;
}