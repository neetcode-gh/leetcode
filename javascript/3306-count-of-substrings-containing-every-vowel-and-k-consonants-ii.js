/**
 * Sliding Window 
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function(word, k) {
    
    const countSubStrWithAtLeastKConsonent = (k) => {

        let left = 0;
        let right = 0;
        const vowels = new Set(["a", "e", "i", "o", "u"]);
        let vowelsCount = {};
        let consonentCount = 0; 
        let count = 0;

        while (right < word.length) {

            const letter = word[right];

            if (vowels.has(letter)) {
                vowelsCount[letter] = (vowelsCount[letter] && vowelsCount[letter] + 1) || 1;
            }    
            if (!vowels.has(letter)) {
                consonentCount++;
            }

            while (Object.keys(vowelsCount).length === 5 && consonentCount >= k) {
                count += word.length - right;

                if (vowels.has(word[left])) {
                    vowelsCount[word[left]] -= 1;
                    if (vowelsCount[word[left]] === 0) {
                        delete vowelsCount[word[left]];
                    }
                }

                if (!vowels.has(word[left])) {
                    consonentCount -= 1;
                }

                left++;
            }

            right++;
        }

        return count;
    }


    return countSubStrWithAtLeastKConsonent(k) - countSubStrWithAtLeastKConsonent(k+1);
};
