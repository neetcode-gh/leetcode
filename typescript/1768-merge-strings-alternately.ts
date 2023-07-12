// Time complexity: O(n)
// Space complexity: O(n)

function mergeAlternately(word1: string, word2: string): string {
    const buffer: Array<string> = [];

    for (let i = 0; i < word1.length || i < word2.length; i++) {
        if (i < word1.length) buffer.push(word1[i]);
        if (i < word2.length) buffer.push(word2[i]);
    }

    return buffer.join('');
}
