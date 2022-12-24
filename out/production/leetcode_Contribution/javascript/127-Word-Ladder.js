/**
 * https://leetcode.com/problems/word-ladder/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
 var ladderLength = function(beginWord, endWord, wordList) {
    const [ queue, wordSet, seen ] = [ new Queue([[ beginWord, 1 ]]), new Set(wordList), new Set([ beginWord ]) ];

    return bfs(queue, wordSet, seen, endWord);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
};

const bfs = (queue, wordSet, seen, endWord) => {
    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {
            const [ word, depth ] = queue.dequeue();

            const isTarget = word === endWord
            if (isTarget) return depth

            transform(queue, wordSet, seen, word, depth)
        }
    }

    return 0
}

const transform = (queue, wordSet, seen, word, depth) => {
    for (const index in word) {
        for (const char of 'abcdefghijklmnopqrstuvwxyz') {
            const neighbor = getNeighbor(word, index, char);

            const hasSeen = !wordSet.has(neighbor) || seen.has(neighbor);
            if (hasSeen) continue;

            queue.enqueue([ neighbor, (depth + 1) ]);
            seen.add(neighbor);
        }
    }
}

const getNeighbor = (word, index, char) => {
    const neighbor = word.split('');

    neighbor[index] = char;

    return neighbor.join('');
}
