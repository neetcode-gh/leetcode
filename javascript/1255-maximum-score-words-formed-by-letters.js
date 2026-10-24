/**
 * Time O(2^n) | Space O(n)
 * BackTrack | BruteForce | Hashing
 * https://leetcode.com/problems/maximum-score-words-formed-by-letters/
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
var maxScoreWords = function(words, letters, score) {

    // helper objects 
    const letterScore = {};
    const letterFreq = {};

    for (let i = 0; i < score.length; i++) {
        const char = String.fromCharCode(97+i);
        letterScore[char] = score[i];
    }

    for (let i = 0; i < letters.length; i++) {
        const char = letters[i];
        letterFreq[char] = (letterFreq[char] && letterFreq[char] + 1) || 1;
    }
    
    // helper function
    const getScore = (word) => {
        let score = 0;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            score += letterScore[char];
        }
        return score;
    }

    const canTakeWord = (word) => {
        const wordCharFreq = {};
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            wordCharFreq[char] = (wordCharFreq[char] && wordCharFreq[char] + 1) || 1;
        }

        for (const key in wordCharFreq) {
            if (!letterFreq[key]) return false;
            if (wordCharFreq[key] > letterFreq[key]) return false;
        }

        return true;
    }

    const takeWord = (word) => {
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            letterFreq[char] -= 1;
        }
    }

    const untakeWord = (word) => {
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            letterFreq[char] += 1;
        }
    }

    let maxScore = 0;

    const dfs = (i, currScore) => {

        if (i === words.length) {
            maxScore = Math.max(maxScore, currScore);
            return;
        }

        // if we have two choices.
        if (canTakeWord(words[i])) {
            takeWord(words[i]);
            dfs(i+1, currScore + getScore(words[i]));
            untakeWord(words[i]);
            dfs(i+1, currScore);
            return;
        }

        // have to skip the curr word.
        dfs(i+1, currScore);
    }

    dfs(0, 0);

    return maxScore;
};
