function lengthOfLastWord(s: string): number {
    let res = 0;
    for (let i = s.length - 1; i > -1; i--) {
        if (s[i] === ' ' && res === 0) continue;
        if (s[i] === ' ') break;
        res += 1;
    }
    return res;
}
