function countPalindromicSubsequence(s: string): number {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';

    const N = alphabets.length;
    let count = 0;

    for (let i = 0; i < N; i += 1) {
        const ch = alphabets[i];
        const left = s.indexOf(ch);
        const right = s.lastIndexOf(ch);
        if (left < right) {
            for (const alpha of alphabets) {
                const mid = s.indexOf(alpha, left + 1);
                if (mid !== -1 && mid < right) count += 1;
            }
        }
    }

    return count;
}
