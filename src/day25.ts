import "../src/extensions.ts";

function sign(digit: string) {
    if(digit === '-') {
        return -1;
    } else if(digit === '=') {
        return -2;
    } else {
        return Number(digit);
    }
}

function unsign(digit: number) {
    if(digit === -2) {
        return '=';
    } else if(digit === -1) {
        return '-';
    } else {
        return ''+digit;
    }
}

export function sum(lines: string[]) {
    return lines.map(l => convert(l)).sum();
}

export function destruct(lines: string[]) {
    let destLines = lines.map(l => dest(l));
    const max = destLines.map(l => l.length).max();
    const sums = new Array<number>();
    for (let i = 0; i < max; i++) {
        sums[i] = 0;
        for (let j = 0; j < destLines.length; j++) {
            if(destLines[j].length>i) {
                sums[i] += destLines[j][i];
            }
        }
    }
    const rests = new Array<number>();
    let div = 0;
    for (let i = 0; i < sums.length; i++) {
        console.log("NEXT "+i);
        console.log(div);
        console.log(sums[i]);


        const tot = div+sums[i];
        div = Math.floor(tot/5);
        console.log(div);
        let rest = tot%5;
        console.log(rest);
        if(rest<-2) {
            // div -= 1;
            rest=5+rest;
        }
        if(rest>2) {
            div += 1;
            rest = rest-5;
        }
        rests[i] = rest;
    }
    console.log(rests);
    return rests.reverse().map(d => unsign(d)).join('');
}

export function dest(line : string) {
    const digits = line.split('');
    const result = new Array<number>();
    for (let i = digits.length-1; i >= 0; i--) {
        result.push(Number(sign(digits[i])));
    }
    return result;
}


export function convert(line : string) {
    let result = 0;
    const digits = line.split('');
    for (let i = 0; i < digits.length; i++) {
        const multiply = Math.pow(5, digits.length-i-1);
        result += multiply * Number(sign(digits[i]));
    }
    return result;
}