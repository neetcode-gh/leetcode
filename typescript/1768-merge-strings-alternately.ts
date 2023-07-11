function mergeAlternately(word1: string, word2: string): string {
    let res = '';

    for (let i = 0; i < word1.length || i < word2.length; i++) {
        if (i < word1.length) res += word1[i];
        if (i < word2.length) res += word2[i];
    }

    return res;
}
