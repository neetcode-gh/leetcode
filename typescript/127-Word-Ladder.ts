function ladderLength(
    beginWord: string,
    endWord: string,
    wordList: string[]
): number {
    if (!wordList.includes(endWord)) {
        return 0;
    }
    let patternMap = {};
    wordList.push(beginWord);

    for (let word of wordList) {
        for (let x = 0; x < word.length; x++) {
            const pattern = word.slice(0, x) + '*' + word.slice(x + 1);
            patternMap[pattern] = patternMap[pattern] || [];
            patternMap[pattern].push(word);
        }
    }

    let wordCount = 1,
        queue = [beginWord],
        visited = [beginWord];
    while (queue.length) {
        const levelSize = queue.length;
        for (let x = 0; x < levelSize; x++) {
            const word = queue.shift();
            if (word === endWord) {
                return wordCount;
            }

            for (let x = 0; x < word.length; x++) {
                const pattern = word.slice(0, x) + '*' + word.slice(x + 1);
                for (let nei of patternMap[pattern]) {
                    if (nei in visited) {
                        continue;
                    }
                    visited[nei] = nei;
                    queue.push(nei);
                }
            }
        }
        wordCount++;
    }
    return 0;
}
