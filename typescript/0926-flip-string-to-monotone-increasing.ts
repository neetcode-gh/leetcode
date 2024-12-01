function minFlipsMonoIncr(s: string): number {
    let res: number = 0;
    let countOne: number = 0;

    for (let ch of s) {
        if (ch == '1') {
            countOne++;
        } else {
            res = Math.min(res + 1, countOne);
        }
    }

    return res;
}
