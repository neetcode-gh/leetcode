function isSubsequence(s: string, t: string): boolean {
    let i = 0;
    let j = 0;

    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i += 1;
        }
        j += 1;
    }

    return i === s.length;
}
