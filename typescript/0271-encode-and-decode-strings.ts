function encode(strs: string[]): string {
    return strs.map((str) => `${str.length}#${str}`).join('');
}

function decode(str: string): string[] {
    let decodedWords: string[] = [];
    let i = 0;

    while (i < str.length) {
        let j: number = i;
        while (str[j] !== '#') {
            j++;
        }
        let len: number = parseInt(str.slice(i, j), 10);
        decodedWords.push(str.slice(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return decodedWords;
}

export {};
