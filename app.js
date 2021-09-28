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

function printGame(shuffleWord,sub_words,word_status){
    console.clear();
    out = `Availiable letters: ${shuffleWord}\n`
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