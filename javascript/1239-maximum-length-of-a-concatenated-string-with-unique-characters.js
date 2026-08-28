/**
 * Backtracking | DFS | Recursion
 * Time O(2^n) | Space O(n)
 * https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
    return dfs(0, new Set(), arr);
};

const checkIfValid = (set, word) => {
    return word.split("").every((char) => {
        if (set.has(char)) return false;
        return true;
    });
}

const addToSet = (set, word) => {
    word.split("").forEach((char) => set.add(char));
}
const removeFromSet = (set, word) => {
    word.split("").forEach((char) => set.delete(char));
}

const dfs = (idx, currSet, arr) =>  {
    if (idx === arr.length) {
        return currSet.size;
    }

    // we have 2 choices
    // the second condition checks weathre there are duplicates in the word itself.
    if (checkIfValid(currSet, arr[idx]) && new Set(arr[idx].split("")).size === arr[idx].length) {
        addToSet(currSet, arr[idx]);
        const choice1 = dfs(idx+1, currSet, arr);
        removeFromSet(currSet, arr[idx]);
        const choice2 = dfs(idx+1, currSet, arr);
        return Math.max(choice1, choice2);
    }

    // only have 1 choice 
    return dfs(idx+1, currSet, arr);
}
