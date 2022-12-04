const aCharCode = "a".charCodeAt(0);
const capitalACharCode = "A".charCodeAt(0);

function findCommonLetter(left: string, right: string) {
    for (let i = 0; i < left.length; i++) {
        if(right.includes(left[i])) {
            return left[i];
        }
    }
    return "a";
}

function findCommonLetters(left: string, right: string):string {
    let result = "";
    for (let i = 0; i < left.length; i++) {
        if(right.includes(left[i])) {
            result+=left[i];
        }
    }
    return result;
}

export function findCommonChar(lines: Array<string>) {
    const partial:string = findCommonLetters(lines[0], lines[1]);
    return findCommonLetter(partial, lines[2]);
}

function calculateCharScore(commonLetter: string) {
    let charCode = commonLetter.charCodeAt(0);
    if (charCode >= aCharCode) {
        return charCode - aCharCode + 1;
    } else {
        return charCode - capitalACharCode + 27;
    }
}

export function calculateLineScore(line: string): number {
    let cut = line.length/2;
    let left = line.slice(0, cut);
    let right = line.slice(cut);
    let commonLetter = findCommonLetter(left, right);
    return calculateCharScore(commonLetter);
}

export function computePartOne(result : Array<string>) {
    return result.filter((s) => s !== '')
        .map((line) => calculateLineScore(line))
        .reduce((acc, current) => {return acc + current;}, 0);
}

export function computePartTwo(result : Array<string>) {
    let sum = 0;
    for (let i = 0; i < (result.length-1)/3; i++) {
        let group = new Array<string>();
        for (let j = 0; j < 3; j++) {
            group[j] = result[i*3 + j];
        }
        sum += calculateCharScore(findCommonChar(group));
    }
    return sum;
}
