function findAllConcatenatedWordsInADict(words: string[]): string[] {
    let wordSet = new Set(words);
    let res: string[] = [];

    for (let w of words) {
        if (dfs(w)) {
            res.push(w);
        }
    }

    return res;

    function dfs(word: string): boolean {
        for (let i = 1; i < word.length; i++) {
            let prefix = word.slice(0, i);
            let suffix = word.slice(i);

            if (
                (wordSet.has(prefix) && wordSet.has(suffix)) ||
                (wordSet.has(prefix) && dfs(suffix))
            ) {
                return true;
            }
        }

        return false;
    }
}
