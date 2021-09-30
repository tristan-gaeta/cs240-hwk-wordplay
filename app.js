class Game {
    constructor() {
        this.sixLetterIndices = [];
        this.filterDictionary();
        this.rootWord;
        this.sub_words;
        this.word_stuatus;
        this.shuffleRoot;
        this.winStatus;
        this.numCorrect;
    }

    play() {
        let randomIndex = Math.floor(Math.random() * this.sixLetterIndices.length);
        let root = dictionary[this.sixLetterIndices[randomIndex]];
        this.playWithRoot(root);
    }

    playWithRoot(root){
        const startTime = Date.now();
        const endTime = startTime + 160000;

        this.newPlay(root)

        this.printGame();
        let input = prompt(`Guess a word:`);

        while (input != null && !(input.toLocaleUpperCase() === `CANCEL`)) {
            if (input == `*`) {
                this.shuffleRoot = this.shuffleWord(this.shuffleRoot);
            } else if (input.length < 3) {
                alert(`That word is too short.`);
            } else if (input.length > 6) {
                alert(`That word is too long.`);
            } else {  //valid entry
                let index = this.sub_words.indexOf(input)
                if (index != -1) {
                    if (this.word_status[index]) {
                        alert(`You've already found "${input}".`);
                    } else {
                        alert(`Correct!`);
                        this.word_status[index] = true;
                        this.numCorrect++;
                    }
                } else {
                    alert(`"${input}" is not a valid word.`);
                }
            }

            this.printGame();

            if (this.numCorrect == this.sub_words.length) {
                this.winStatus = true;
                break;
            }else if(Date.now() >= endTime){
                alert('Time is Up!')
                break;
            }
            
            input = prompt('Guess a word:');
        }
        this.endGame();
    }

    endGame(){
        if (this.winStatus) {
            alert(`Congratulations! You guessed all ${this.sub_words.length} words!`);
        } else {
            this.word_status = this.sub_words.map(_ => true);
        }
        this.printGame(`You guessed ${this.numCorrect} out of ${this.sub_words.length} words!\n`);
    }

    printGame(head = `Availiable letters: ${this.shuffleRoot}\n`){
        console.clear();
        let out = head;
        for (let i = 0; i < this.sub_words.length; i++){
            if (this.word_status[i]){
                out += this.sub_words[i]+`\n`;
            }else{
                let log = `-`;
                out += log.repeat(this.sub_words[i].length)+`\n`;
            }
        }
        console.log(out);
    }
    
    shuffleWord(inStr){
        if (inStr.length == 1){
            return inStr;
        }
        let randIndex = Math.floor(inStr.length * Math.random());
        let randChar = inStr.charAt(randIndex);
        inStr = inStr.replace(randChar,``);
        return randChar+this.shuffleWord(inStr);
    }
    
    find_sub_words_for(rootWord){
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

    newPlay(root){
        this.rootWord = root;
        this.sub_words = this.find_sub_words_for(this.rootWord);
        this.word_status = this.sub_words.map(_ => false);
        this.shuffleRoot = this.shuffleWord(this.rootWord);
        this.winStatus = false;
        this.numCorrect = 0;
    }

    filterDictionary(){
        for (let i = 0; i < dictionary.length; i++) {
            if (dictionary[i].length == 6) {
                this.sixLetterIndices.push(i);
            }
            else if (dictionary[i].length > 6 || dictionary[i].length < 3) {
                dictionary.splice(i, 1);
                i--;
            }
        }
    }
}