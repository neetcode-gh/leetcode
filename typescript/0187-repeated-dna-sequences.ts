function findRepeatedDnaSequences(s: string): string[] {
    let seen = new Set<string>();
    let res = new Set<string>();

    for (let i = 0; i < s.length - 9; i++) {
        let cur = s.slice(i, i + 10);
        if (seen.has(cur)) {
            res.add(cur);
        }
        seen.add(cur);
    }

    return Array.from(res);
}
