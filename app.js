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
console.log(dictionary[sixLetterIndices[5]]);